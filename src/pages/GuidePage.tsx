import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllCities } from "@/lib/supabase";
import explainer from "@/data/ztl-explainer.json";
import { getGuide, matchesFilter, isFreeCost, GUIDES } from "@/lib/guides";
import Header from "@/components/Header";
import Seo, { SITE_URL, SITE_NAME } from "@/components/Seo";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  slug: string;
}

/**
 * Pagine di aggregazione (sosta gratuita, accesso senza permesso, costi).
 *
 * Esistono perché rispondono a domande di confronto che nessuna singola scheda
 * città può soddisfare. Non duplicano le schede: rimandano a esse.
 */
const GuidePage = ({ slug }: Props) => {
  const guide = getGuide(slug)!;
  const { data: cities, isLoading } = useQuery({
    queryKey: ["all-cities"],
    queryFn: getAllCities,
  });

  const matches = useMemo(
    () => (cities ?? []).filter((c) => matchesFilter(c, guide.filter)),
    [cities, guide.filter],
  );

  const freeCount = useMemo(
    () => matches.filter((c) => isFreeCost(c.cost)).length,
    [matches],
  );

  const jsonLd = [
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
      "@type": "CollectionPage",
      name: guide.title,
      url: `${SITE_URL}/${guide.slug}`,
      inLanguage: "it-IT",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      ...(guide.layout !== "article" && matches.length > 0 && {
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
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Seo
        title={`${guide.title} | ${SITE_NAME}`}
        description={guide.description}
        path={`/${guide.slug}`}
        jsonLd={jsonLd}
      />
      <Header />

      <main className="flex-1 container mx-auto p-4">
        <nav aria-label="Percorso" className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page">{guide.navLabel}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-3">{guide.h1}</h1>
        <p className="text-muted-foreground mb-6 max-w-3xl">{guide.intro}</p>

        {guide.layout === "article" ? (
          <div className="space-y-6 max-w-3xl">
            {explainer.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-semibold mb-1">{s.heading}</h2>
                <p className="text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        ) : isLoading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <p className="text-muted-foreground">{guide.emptyLabel}</p>
        ) : guide.layout === "cost-table" ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {matches.length} città con costo dichiarato, di cui {freeCount} a
              rilascio gratuito.
            </p>
            <div className="overflow-x-auto rounded-lg border bg-white">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Costo del permesso ZTL per veicoli elettrici, per città
                </caption>
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th scope="col" className="p-3 font-semibold">Città</th>
                    <th scope="col" className="p-3 font-semibold">Costo del permesso</th>
                    <th scope="col" className="p-3 font-semibold">Pagamento</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Le gratuite prima: è la risposta che quasi tutti cercano. */}
                  {[...matches]
                    .sort((a, b) => {
                      const d = Number(isFreeCost(b.cost)) - Number(isFreeCost(a.cost));
                      return d !== 0 ? d : a.name.localeCompare(b.name);
                    })
                    .map((c) => (
                      <tr key={c.id} className="border-t">
                        <th scope="row" className="p-3 font-medium text-left">
                          <Link
                            to={`/citta/${c.id}`}
                            className="text-primary hover:underline"
                          >
                            {c.name}
                          </Link>
                          <span className="block text-xs font-normal text-muted-foreground">
                            {c.region}
                          </span>
                        </th>
                        <td className="p-3">{c.cost}</td>
                        <td className="p-3 text-muted-foreground">
                          {c.payment_method || "—"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {matches.length} città su {cities?.length ?? 0}.
            </p>
            <ul className="space-y-3">
              {matches.map((c) => {
                const detail = guide.detailField
                  ? (c as Record<string, string>)[guide.detailField]
                  : undefined;
                return (
                  <li key={c.id} className="rounded-lg border bg-white p-4">
                    <h2 className="font-semibold">
                      <Link to={`/citta/${c.id}`} className="text-primary hover:underline">
                        {c.name}
                      </Link>
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {c.region}
                      </span>
                    </h2>
                    {detail && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {guide.detailLabel}:
                        </span>{" "}
                        {detail}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        {c.free_parking ? (
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-gray-400" />
                        )}
                        Sosta {c.free_parking ? "gratuita" : "a pagamento"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        {c.needs_display ? (
                          <XCircle className="h-3.5 w-3.5 text-gray-400" />
                        ) : (
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        )}
                        {c.needs_display ? "Serve il contrassegno" : "Nessun contrassegno"}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <section className="mt-10 rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold mb-3">Altre guide</h2>
          <ul className="space-y-2">
            {GUIDES.filter((g) => g.slug !== guide.slug).map((g) => (
              <li key={g.slug}>
                <Link to={`/${g.slug}`} className="text-primary hover:underline">
                  {g.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/citta" className="text-primary hover:underline">
                Elenco completo delle città
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Le regole cambiano per delibera comunale: verifica sempre sul sito
            ufficiale del Comune prima di accedere.
          </p>
        </section>
      </main>
    </div>
  );
};

export default GuidePage;
