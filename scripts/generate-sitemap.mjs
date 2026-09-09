#!/usr/bin/env node
/**
 * Genera dist/sitemap.xml a partire dai dati reali di Supabase.
 *
 * Sostituisce il file statico public/sitemap.xml, che era fermo ad aprile 2025 e
 * puntava allo schema URL legacy ?city=X, ormai non più servito da nessuna route.
 *
 * Va eseguito DOPO `vite build`, così scrive in dist/ senza essere sovrascritto
 * dalla copia di public/.
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://ztlelettrica.it";
const OUT = resolve(ROOT, "dist/sitemap.xml");

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const GUIDES = JSON.parse(readFileSync(resolve(ROOT, "src/data/guides.json"), "utf8"));

/** Pagine non generate da dati. `lastmod` viene omesso: non lo conosciamo. */
const STATIC_PAGES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/citta", changefreq: "weekly", priority: "0.9" },
  // Le guide cambiano quando cambiano i dati città, quindi settimanali come l'hub.
  ...GUIDES.map((g) => ({ path: `/${g.slug}`, changefreq: "weekly", priority: "0.8" })),
  { path: "/richiedi-zona", changefreq: "monthly", priority: "0.6" },
  { path: "/contatti", changefreq: "monthly", priority: "0.4" },
];

const xmlEscape = (s) =>
  String(s).replace(
    /[<>&'"]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c],
  );

async function fetchCities() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error(
      "VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY sono richieste per generare la sitemap.",
    );
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/ztl_electric_cities?select=id,updated_at,created_at&order=name`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
  );

  if (!res.ok) {
    throw new Error(`Supabase ha risposto ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function buildXml(cities) {
  const urls = [
    ...STATIC_PAGES.map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n` +
        `    <changefreq>${p.changefreq}</changefreq>\n` +
        `    <priority>${p.priority}</priority>\n  </url>`,
    ),
    ...cities.map((c) => {
      // lastmod riflette l'aggiornamento reale del dato, non il momento della build.
      const stamp = c.updated_at || c.created_at;
      const lastmod = stamp ? `    <lastmod>${new Date(stamp).toISOString().slice(0, 10)}</lastmod>\n` : "";
      return (
        `  <url>\n    <loc>${SITE_URL}/citta/${xmlEscape(c.id)}</loc>\n` +
        lastmod +
        `    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      );
    }),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

const cities = await fetchCities();
if (cities.length === 0) {
  // Fallire è preferibile a pubblicare una sitemap con le sole pagine statiche:
  // segnalerebbe a Google che le schede città non esistono più.
  throw new Error("Nessuna città restituita da Supabase: sitemap non generata.");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, buildXml(cities), "utf8");
console.log(`sitemap.xml generata: ${STATIC_PAGES.length} pagine statiche + ${cities.length} città`);
