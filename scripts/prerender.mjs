#!/usr/bin/env node
/**
 * Prerendering statico delle pagine città.
 *
 * PROBLEMA RISOLTO: il sito è una SPA senza SSR. Un crawler che non esegue
 * JavaScript (GPTBot, ClaudeBot, PerplexityBot, CCBot) riceve per tutte le 65
 * pagine città lo stesso HTML vuoto della home — stesso title, stessa meta
 * description, <div id="root"></div> senza contenuto. Verificato via curl.
 *
 * SOLUZIONE: a build finita, per ogni città scriviamo dist/citta/<slug>/index.html
 * partendo dal bundle già compilato, iniettando nel <head> i meta reali e dentro
 * #root un blocco di contenuto testuale vero.
 *
 * Netlify serve un file statico esistente PRIMA di applicare il redirect
 * catch-all di netlify.toml (che non è `force`), quindi questi file vincono.
 *
 * I file sono scritti come `<slug>.html`, non `<slug>/index.html`: una cartella
 * con index.html fa rispondere a Netlify un 301 verso la variante con slash
 * finale, e ogni URL della sitemap costerebbe un hop di redirect con il
 * canonical puntato a un indirizzo che redirige. Con il file .html l'URL senza
 * slash risponde 200 direttamente.
 * React monta con createRoot().render(), che sostituisce il contenuto di #root:
 * nessun mismatch di hydration, solo il markup statico rimpiazzato dall'app.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE_URL = "https://ztlelettrica.it";
const SITE_NAME = "ZTL Elettrica Italia";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const esc = (s) =>
  String(s ?? "").replace(
    /[<>&"']/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c],
  );

/** Testo pulito su una riga, per title e meta description. */
const flat = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

const truncate = (s, n) => {
  const t = flat(s);
  if (t.length <= n) return t;
  return t.slice(0, t.lastIndexOf(" ", n - 1)).replace(/[,;:.]$/, "") + "…";
};

async function fetchCities() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY sono richieste per il prerendering.");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/ztl_electric_cities?select=*&order=name`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) throw new Error(`Supabase ha risposto ${res.status}: ${await res.text()}`);
  return res.json();
}

/* ------------------------------------------------------------------ *
 * Testo della pagina                                                  *
 * ------------------------------------------------------------------ */

function buildTitle(city) {
  const verdict = city.needs_display ? "serve il permesso" : "accesso libero";
  return `ZTL ${city.name} auto elettriche: ${verdict}, costi e regole | ${SITE_NAME}`;
}

function buildDescription(city) {
  const access = city.needs_display
    ? "serve esporre il contrassegno"
    : "accesso senza permesso";
  const parking = city.free_parking ? "sosta gratuita" : "sosta a pagamento";
  const cost = flat(city.cost);
  const bits = [
    `ZTL ${city.name} e auto elettriche: ${access}, ${parking}.`,
    cost ? `Costo: ${cost}.` : "",
    "Documenti richiesti, orari dell'ufficio comunale e contatti.",
  ].filter(Boolean);
  return truncate(bits.join(" "), 158);
}

/**
 * Paragrafo di apertura autosufficiente: risponde alla domanda nella prima
 * frase, così è estraibile e citabile fuori dal contesto della pagina.
 */
function buildAnswer(city) {
  const parts = [];
  parts.push(
    city.needs_display
      ? `A ${city.name} i veicoli elettrici possono accedere alla ZTL ma devono esporre il contrassegno previsto dal Comune.`
      : `A ${city.name} i veicoli elettrici accedono alla ZTL senza dover esporre alcun contrassegno.`,
  );
  if (flat(city.ztl_access_description)) parts.push(flat(city.ztl_access_description));
  if (flat(city.cost)) parts.push(`Il costo previsto è ${flat(city.cost)}.`);
  if (flat(city.requirements)) parts.push(`Requisiti: ${flat(city.requirements)}`);
  parts.push(
    city.free_parking
      ? `La sosta per i veicoli elettrici a ${city.name} è gratuita nelle zone indicate dal Comune.`
      : `La sosta per i veicoli elettrici a ${city.name} è a pagamento.`,
  );
  return parts.join(" ");
}

function buildJsonLd(city) {
  const url = `${SITE_URL}/citta/${city.id}`;
  const modified = city.updated_at || city.created_at;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Città", item: `${SITE_URL}/citta` },
        { "@type": "ListItem", position: 3, name: city.name, item: url },
      ],
    },
    // Deve restare allineato a src/pages/CityPage.tsx: se i due divergono, i
    // crawler senza JS e gli utenti vedrebbero due schemi diversi per la stessa URL.
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: `ZTL ${city.name} e auto elettriche: regole di accesso e sosta`,
      description: city.description || buildDescription(city),
      inLanguage: "it-IT",
      ...(modified && { dateModified: new Date(modified).toISOString() }),
      ...(city.created_at && { datePublished: new Date(city.created_at).toISOString() }),
      // La PAGINA è curata dal sito; il SERVIZIO è erogato dal Comune.
      // Tenere distinte le due attribuzioni evita di arrogarsi autorità istituzionale.
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      ...(city.request_url && { citation: city.request_url }),
      mainEntity: {
        "@type": "GovernmentService",
        name: `Accesso ZTL per veicoli elettrici a ${city.name}`,
        serviceType: "Accesso e permessi ZTL per veicoli elettrici",
        description:
          flat(city.ztl_access_description) ||
          flat(city.description) ||
          `Regolamento ZTL per veicoli elettrici a ${city.name}.`,
        areaServed: {
          "@type": "City",
          name: city.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: city.region,
            addressCountry: "IT",
          },
        },
        provider: {
          "@type": city.office_address ? "GovernmentOffice" : "GovernmentOrganization",
          name: `Comune di ${city.name}`,
          ...(city.request_url && { url: city.request_url }),
          ...(city.phone && { telephone: city.phone }),
          ...(city.email && { email: city.email }),
          ...(city.office_address && {
            address: {
              "@type": "PostalAddress",
              streetAddress: flat(city.office_address),
              addressLocality: city.name,
              addressRegion: city.region,
              addressCountry: "IT",
            },
          }),
        },
        ...(city.request_url && { termsOfService: city.request_url }),
        ...(city.cost && {
          offers: {
            "@type": "Offer",
            description: [flat(city.cost), flat(city.payment_method)].filter(Boolean).join(" — "),
            ...(city.request_url && { url: city.request_url }),
          },
        }),
      },
    },
  ];
}

// Stessa fonte di src/components/ZtlExplainer.tsx.
const EXPLAINER = JSON.parse(readFileSync(resolve(ROOT, "src/data/ztl-explainer.json"), "utf8"));

/**
 * Sulle schede città va solo il rimando: il testo integrale, ripetuto su tutte
 * e 65, faceva crollare l'unicità al 5,7% e generava 864 coppie di pagine
 * simili oltre l'80%. Il contenuto completo sta su /come-funziona-una-ztl.
 */
function buildExplainer() {
  return `
    <h2>${esc(EXPLAINER.heading)}</h2>
    <p>${esc(EXPLAINER.teaser)}</p>
    <p><a href="${SITE_URL}/come-funziona-una-ztl">Leggi la guida completa alle ZTL italiane</a></p>`;
}

function buildBody(city) {
  const rows = [
    ["Accesso alla ZTL", city.needs_display ? "Serve esporre il contrassegno" : "Accesso senza contrassegno"],
    ["Sosta", city.free_parking ? "Gratuita nelle zone indicate" : "A pagamento"],
    ["Costo", flat(city.cost)],
    ["Durata", flat(city.duration)],
    ["Requisiti", flat(city.requirements)],
    ["Documenti richiesti", flat(city.required_documents)],
    ["Modalità di pagamento", flat(city.payment_method)],
    ["Zone di sosta", flat(city.parking_zones_description)],
    ["Note", flat(city.notes)],
    ["Ufficio competente", flat(city.office_address)],
    ["Orari", flat(city.office_hours)],
    ["Telefono", flat(city.phone)],
    ["Email", flat(city.email)],
  ].filter(([, v]) => v);

  const modified = city.updated_at || city.created_at;
  const dateLabel = modified
    ? new Date(modified).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return `
    <nav aria-label="Percorso"><a href="${SITE_URL}/">Home</a> / <a href="${SITE_URL}/citta">Città</a> / <span>${esc(city.name)}</span></nav>
    <h1>ZTL ${esc(city.name)} e auto elettriche: regole di accesso e sosta</h1>
    <p>${esc(buildAnswer(city))}</p>
    ${flat(city.description) ? `<p>${esc(flat(city.description))}</p>` : ""}
    <h2>Posso entrare in ZTL a ${esc(city.name)} con un'auto elettrica?</h2>
    <dl>
      ${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("\n      ")}
    </dl>
    ${buildExplainer()}
    ${dateLabel ? `<p>Ultimo aggiornamento: <time datetime="${new Date(modified).toISOString().slice(0, 10)}">${esc(dateLabel)}</time></p>` : ""}
    ${city.request_url ? `<p>Fonte ufficiale: <a href="${esc(city.request_url)}" rel="nofollow noopener">sito del Comune di ${esc(city.name)}</a></p>` : ""}
    <p>Le regole ZTL cambiano per delibera comunale: verifica sempre sul sito ufficiale del Comune prima di accedere.</p>
    <p><a href="${SITE_URL}/citta">Vedi tutte le città</a></p>
  `;
}

/* ------------------------------------------------------------------ *
 * Iniezione nel template compilato                                    *
 * ------------------------------------------------------------------ */

function render(template, { title, description, canonical, jsonLd, body }) {
  let html = template;

  // Sostituisce i valori statici della home, che altrimenti resterebbero
  // identici su tutte le pagine per i crawler senza JS.
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${esc(canonical)}" />`,
  );

  // index.html non dichiara più un canonical statico (creava un secondo tag in
  // conflitto con quello di Helmet): qui lo iniettiamo, uno solo, già corretto.
  const head = [
    `<link rel="canonical" href="${esc(canonical)}" />`,
    ...jsonLd.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`),
  ].join("\n    ");
  html = html.replace("</head>", `  ${head}\n  </head>`);

  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  return html;
}

/* ------------------------------------------------------------------ *
 * Esecuzione                                                          *
 * ------------------------------------------------------------------ */

const template = readFileSync(resolve(DIST, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html non contiene <div id="root"></div>: prerendering interrotto.');
}

const cities = await fetchCities();
if (cities.length === 0) throw new Error("Nessuna città da Supabase: prerendering interrotto.");

for (const city of cities) {
  const out = resolve(DIST, "citta", `${city.id}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    render(template, {
      title: buildTitle(city),
      description: buildDescription(city),
      canonical: `${SITE_URL}/citta/${city.id}`,
      jsonLd: buildJsonLd(city),
      body: buildBody(city),
    }),
    "utf8",
  );
}

// Pagina indice: è il nodo che rende raggiungibili tutte le altre.
const byRegion = new Map();
for (const c of cities) {
  const r = c.region || "Altre";
  if (!byRegion.has(r)) byRegion.set(r, []);
  byRegion.get(r).push(c);
}
const indexBody = `
    <nav aria-label="Percorso"><a href="${SITE_URL}/">Home</a> / <span>Città</span></nav>
    <h1>Regole ZTL per auto elettriche, città per città</h1>
    <p>Ogni comune italiano decide autonomamente se e come i veicoli elettrici possono accedere alla ZTL e sostare. Qui trovi le ${cities.length} città coperte finora.</p>
    ${[...byRegion.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([region, list]) =>
          `<h2>${esc(region)}</h2>\n    <ul>${list
            .map((c) => `<li><a href="${SITE_URL}/citta/${esc(c.id)}">ZTL ${esc(c.name)} auto elettriche</a></li>`)
            .join("")}</ul>`,
      )
      .join("\n    ")}
  `;

const indexOut = resolve(DIST, "citta.html");
mkdirSync(dirname(indexOut), { recursive: true });
writeFileSync(
  indexOut,
  render(template, {
    title: `Regole ZTL per auto elettriche: ${cities.length} città italiane | ${SITE_NAME}`,
    description: `Elenco completo dei comuni italiani con regole ZTL e parcheggi per veicoli elettrici. Accesso, costi, permessi e contatti dell'ufficio comunale, città per città.`,
    canonical: `${SITE_URL}/citta`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Regole ZTL per auto elettriche in Italia",
        url: `${SITE_URL}/citta`,
        inLanguage: "it-IT",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: cities.length,
          itemListElement: cities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            url: `${SITE_URL}/citta/${c.id}`,
          })),
        },
      },
    ],
    body: indexBody,
  }),
  "utf8",
);

/* ------------------------------------------------------------------ *
 * Pagine guida (aggregazioni)                                         *
 * ------------------------------------------------------------------ */

// Stessa fonte di src/lib/guides.ts: l'elenco servito ai crawler e quello
// mostrato agli utenti non possono divergere.
const GUIDES = JSON.parse(readFileSync(resolve(ROOT, "src/data/guides.json"), "utf8"));

const matchesFilter = (city, filter) => {
  const value = city[filter.field];
  if (filter.notEmpty) return typeof value === "string" && value.trim() !== "";
  return value === filter.equals;
};

const isFreeCost = (cost) => /gratuit|gratis|nessun costo/i.test(cost ?? "");

function buildGuideBody(guide, matches, total) {
  const link = (c) =>
    `<a href="${SITE_URL}/citta/${esc(c.id)}">${esc(c.name)}</a>`;

  let main;
  if (guide.layout === "article") {
    main = EXPLAINER.sections
      .map((sec) => `<h2>${esc(sec.heading)}</h2>\n    <p>${esc(sec.body)}</p>`)
      .join("\n    ");
  } else if (guide.layout === "cost-table") {
    const sorted = [...matches].sort((a, b) => {
      const d = Number(isFreeCost(b.cost)) - Number(isFreeCost(a.cost));
      return d !== 0 ? d : a.name.localeCompare(b.name);
    });
    const free = matches.filter((c) => isFreeCost(c.cost)).length;
    main = `
    <p>${matches.length} città con costo dichiarato, di cui ${free} a rilascio gratuito.</p>
    <table>
      <caption>Costo del permesso ZTL per veicoli elettrici, per città</caption>
      <thead><tr><th scope="col">Città</th><th scope="col">Costo del permesso</th><th scope="col">Pagamento</th></tr></thead>
      <tbody>${sorted
        .map(
          (c) =>
            `<tr><th scope="row">${link(c)} — ${esc(c.region)}</th><td>${esc(flat(c.cost))}</td><td>${esc(flat(c.payment_method)) || "—"}</td></tr>`,
        )
        .join("")}</tbody>
    </table>`;
  } else {
    main = `
    <p>${matches.length} città su ${total}.</p>
    <ul>${matches
      .map((c) => {
        const detail = guide.detailField ? flat(c[guide.detailField]) : "";
        return `<li><h2>${link(c)} — ${esc(c.region)}</h2>${
          detail ? `<p>${esc(guide.detailLabel)}: ${esc(detail)}</p>` : ""
        }<p>Sosta ${c.free_parking ? "gratuita" : "a pagamento"}. ${
          c.needs_display ? "Serve il contrassegno." : "Nessun contrassegno richiesto."
        }</p></li>`;
      })
      .join("")}</ul>`;
  }

  return `
    <nav aria-label="Percorso"><a href="${SITE_URL}/">Home</a> / <span>${esc(guide.navLabel)}</span></nav>
    <h1>${esc(guide.h1)}</h1>
    <p>${esc(guide.intro)}</p>
    ${main}
    <h2>Altre guide</h2>
    <ul>${GUIDES.filter((g) => g.slug !== guide.slug)
      .map((g) => `<li><a href="${SITE_URL}/${g.slug}">${esc(g.h1)}</a></li>`)
      .join("")}<li><a href="${SITE_URL}/citta">Elenco completo delle città</a></li></ul>
    <p>Le regole cambiano per delibera comunale: verifica sempre sul sito ufficiale del Comune prima di accedere.</p>`;
}

for (const guide of GUIDES) {
  // Le guide "article" sono testo condiviso: non filtrano città.
  const matches =
    guide.layout === "article" ? [] : cities.filter((c) => matchesFilter(c, guide.filter));
  if (guide.layout !== "article" && matches.length === 0) {
    throw new Error(`Guida "${guide.slug}": nessuna città corrisponde al filtro, pagina non generata.`);
  }

  const out = resolve(DIST, `${guide.slug}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    render(template, {
      title: `${guide.title} | ${SITE_NAME}`,
      description: guide.description,
      canonical: `${SITE_URL}/${guide.slug}`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: guide.navLabel, item: `${SITE_URL}/${guide.slug}` },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": guide.layout === "article" ? "Article" : "CollectionPage",
          ...(guide.layout === "article" && {
            headline: guide.h1,
            author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          }),
          name: guide.title,
          url: `${SITE_URL}/${guide.slug}`,
          inLanguage: "it-IT",
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
          ...(matches.length > 0 && {
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: matches.length,
              itemListElement: matches.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.name,
                url: `${SITE_URL}/citta/${c.id}`,
              })),
            },
          }),
        },
      ],
      body: buildGuideBody(guide, matches, cities.length),
    }),
    "utf8",
  );
}

/* Pagine statiche: senza prerendering erediterebbero title, description e
 * canonical della home per ogni crawler che non esegue JavaScript. */
const STATIC = [
  {
    path: "/contatti",
    file: "contatti.html",
    title: `Contatti | ${SITE_NAME}`,
    description:
      "Contatta ZTL Elettrica Italia per segnalare un aggiornamento, correggere un dato o proporre una nuova città.",
    body: `
    <nav aria-label="Percorso"><a href="${SITE_URL}/">Home</a> / <span>Contatti</span></nav>
    <h1>Contatti</h1>
    <p>ZTL Elettrica Italia è un progetto collaborativo che raccoglie le regole di accesso alle ZTL per veicoli elettrici nei comuni italiani. Se trovi un dato errato o non aggiornato, segnalacelo.</p>
    <p><a href="${SITE_URL}/citta">Vedi tutte le città</a></p>`,
  },
  {
    path: "/richiedi-zona",
    file: "richiedi-zona.html",
    title: `Aggiungi una città | ${SITE_NAME}`,
    description:
      "Proponi una nuova città da aggiungere alla mappa delle ZTL per auto elettriche. Il progetto cresce con le segnalazioni della community.",
    body: `
    <nav aria-label="Percorso"><a href="${SITE_URL}/">Home</a> / <span>Aggiungi una città</span></nav>
    <h1>Aggiungi una città</h1>
    <p>Conosci le regole ZTL per veicoli elettrici del tuo comune? Inviacele e le aggiungeremo alla mappa dopo la verifica.</p>
    <p><a href="${SITE_URL}/citta">Vedi le città già coperte</a></p>`,
  },
];

for (const page of STATIC) {
  const out = resolve(DIST, page.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    render(template, {
      title: page.title,
      description: page.description,
      canonical: `${SITE_URL}${page.path}`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: page.title.split(" | ")[0], item: `${SITE_URL}${page.path}` },
          ],
        },
      ],
      body: page.body,
    }),
    "utf8",
  );
}

/* Homepage: sovrascritta per ultima, perché `template` è già stato letto in
 * memoria e serve intatto a tutte le pagine sopra. */
writeFileSync(
  resolve(DIST, "index.html"),
  render(template, {
    title: `ZTL auto elettriche: regole e accessi in ${cities.length} città italiane | ${SITE_NAME}`,
    description: `ZTL auto elettriche in ${cities.length} città italiane: dove entri senza permesso, dove serve il contrassegno, costi e documenti comune per comune.`,
    canonical: `${SITE_URL}/`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "it-IT",
      },
    ],
    body: `
    <h1>ZTL e auto elettriche: regole di accesso in ${cities.length} città italiane</h1>
    <p>Ogni comune decide autonomamente se i veicoli elettrici possono accedere alla ZTL, se serve un contrassegno e se la sosta è gratuita. Consulta le regole aggiornate città per città.</p>
    <h2>Guide</h2>
    <ul>${GUIDES.map((g) => `<li><a href="${SITE_URL}/${g.slug}">${esc(g.h1)}</a></li>`).join("")}</ul>
    <h2>Città coperte</h2>
    <ul>${cities
      .map((c) => `<li><a href="${SITE_URL}/citta/${esc(c.id)}">ZTL ${esc(c.name)} auto elettriche</a></li>`)
      .join("")}</ul>
    <p><a href="${SITE_URL}/citta">Elenco completo per regione</a></p>`,
  }),
  "utf8",
);

console.log(
  `prerendering completato: ${cities.length} pagine città + /citta + ${GUIDES.length} guide + ${STATIC.length} pagine statiche + home ` +
    `(${cities.length + 1 + GUIDES.length + STATIC.length + 1} URL totali)`,
);
