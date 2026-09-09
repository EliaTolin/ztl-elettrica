import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllCities } from "@/lib/supabase";
import { GUIDES } from "@/lib/guides";
import Header from "@/components/Header";
import Seo, { SITE_URL, SITE_NAME } from "@/components/Seo";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle, MapPin } from "lucide-react";

interface CityListItem {
  id: string;
  name: string;
  region: string;
  free_parking: boolean;
  needs_display: boolean;
}

/**
 * Indice di tutte le città coperte, raggruppate per regione.
 *
 * Esiste soprattutto per il crawl: prima di questa pagina nessun link HTML
 * puntava a /citta/:slug, quindi le schede città erano orfane e Google non
 * poteva scoprirle. I <Link> di react-router rendono <a href> reali.
 */
const CitiesIndex = () => {
  const { data: cities, isLoading } = useQuery({
    queryKey: ["all-cities"],
    queryFn: getAllCities,
  });

  const byRegion = useMemo(() => {
    const groups = new Map<string, CityListItem[]>();
    (cities ?? []).forEach((city) => {
      const region = city.region || "Altre";
      if (!groups.has(region)) groups.set(region, []);
      groups.get(region)!.push(city as CityListItem);
    });
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [cities]);

  const total = cities?.length ?? 0;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Città",
          item: `${SITE_URL}/citta`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Elenco città con regole ZTL per auto elettriche`,
      url: `${SITE_URL}/citta`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      ...(total > 0 && {
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: total,
          itemListElement: (cities ?? []).map((city, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: city.name,
            url: `${SITE_URL}/citta/${city.id}`,
          })),
        },
      }),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Seo
        title={`Regole ZTL per auto elettriche: ${total || 65} città italiane | ${SITE_NAME}`}
        description={`Elenco completo dei comuni italiani con regole ZTL e parcheggi per veicoli elettrici. Accesso, costi, permessi e contatti dell'ufficio comunale, città per città.`}
        path="/citta"
        jsonLd={jsonLd}
      />
      <Header />

      <main className="flex-1 container mx-auto p-4">
        <nav aria-label="Percorso" className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page">Città</span>
        </nav>

        <h1 className="text-3xl font-bold mb-3">
          Regole ZTL per auto elettriche, città per città
        </h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Ogni comune italiano decide autonomamente se e come i veicoli elettrici
          possono accedere alla ZTL e sostare. Qui trovi{" "}
          {total > 0 ? `le ${total} città` : "le città"} coperte finora, con
          accesso, costi, documenti richiesti e i contatti dell'ufficio comunale
          di riferimento.
        </p>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-40 mb-3" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-10" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {byRegion.map(([region, list]) => (
              <section key={region}>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {region}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({list.length})
                  </span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {list.map((city) => (
                    <li key={city.id}>
                      <Link
                        to={`/citta/${city.id}`}
                        className="flex items-center justify-between gap-2 bg-white rounded-lg border p-3 hover:border-primary hover:shadow-sm transition-all"
                      >
                        <span className="font-medium">
                          ZTL {city.name} auto elettriche
                        </span>
                        <span
                          className="shrink-0"
                          title={
                            city.free_parking
                              ? "Sosta gratuita"
                              : "Sosta a pagamento"
                          }
                        >
                          {city.free_parking ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-400" />
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        <div className="mt-10 bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-3">Cerchi una risposta specifica?</h2>
          <ul className="space-y-2 mb-6">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link to={`/${g.slug}`} className="text-primary hover:underline">
                  {g.h1}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mb-2">
            La tua città non è in elenco?
          </h2>
          <p className="text-muted-foreground mb-4">
            Il progetto cresce con le segnalazioni della community. Se conosci le
            regole ZTL del tuo comune, aggiungile.
          </p>
          <Link
            to="/richiedi-zona"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
          >
            Aggiungi una città
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CitiesIndex;
