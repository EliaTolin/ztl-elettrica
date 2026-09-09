import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCityBySlug } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Car, Euro, FileText, ExternalLink, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Seo, { SITE_URL, SITE_NAME } from "@/components/Seo";
import ZtlExplainer from "@/components/ZtlExplainer";

const CityPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: city, isLoading } = useQuery({
    queryKey: ["city", slug],
    queryFn: () => getCityBySlug(slug!.toLowerCase().replace(/\s+/g, '-')),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Caricamento... | ZTL Elettrica Italia</title>
          <meta name="description" content="Caricamento informazioni ZTL elettrica" />
        </Helmet>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="mb-6">
              <Skeleton className="h-8 w-48" />
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </main>
        </div>
      </>
    );
  }

  if (!city) {
    return (
      <>
        <Helmet>
          <title>Città non trovata | ZTL Elettrica Italia</title>
          <meta name="description" content="La città richiesta non è stata trovata nel nostro database ZTL elettriche." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Città non trovata</h1>
              <p className="mb-6">La città che stai cercando non esiste o è stata rimossa.</p>
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Torna alla home
                </Link>
              </Button>
            </div>
          </main>
        </div>
      </>
    );
  }

  const canonicalPath = `/citta/${slug}`;
  const modified = city.updated_at || city.created_at;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Città", item: `${SITE_URL}/citta` },
        { "@type": "ListItem", position: 3, name: city.name, item: `${SITE_URL}${canonicalPath}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}${canonicalPath}`,
      url: `${SITE_URL}${canonicalPath}`,
      name: `ZTL ${city.name} e auto elettriche: regole di accesso e sosta`,
      description: city.description,
      inLanguage: "it-IT",
      ...(modified && { dateModified: new Date(modified).toISOString() }),
      ...(city.created_at && { datePublished: new Date(city.created_at).toISOString() }),
      // La PAGINA è scritta e curata dal sito. Il SERVIZIO descritto è invece
      // erogato dal Comune: le due attribuzioni vanno tenute distinte, altrimenti
      // ci si arroga un'autorità istituzionale che non si ha.
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      ...(city.request_url && { citation: city.request_url }),
      mainEntity: {
        "@type": "GovernmentService",
        name: `Accesso ZTL per veicoli elettrici a ${city.name}`,
        serviceType: "Accesso e permessi ZTL per veicoli elettrici",
        description:
          city.ztl_access_description ||
          city.description ||
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
        // GovernmentOffice richiede un luogo fisico: senza indirizzo degradiamo
        // a GovernmentOrganization invece di emettere un'entità incompleta.
        provider: {
          "@type": city.office_address ? "GovernmentOffice" : "GovernmentOrganization",
          name: `Comune di ${city.name}`,
          ...(city.request_url && { url: city.request_url }),
          ...(city.phone && { telephone: city.phone }),
          ...(city.email && { email: city.email }),
          ...(city.office_address && {
            address: {
              "@type": "PostalAddress",
              streetAddress: city.office_address,
              addressLocality: city.name,
              addressRegion: city.region,
              addressCountry: "IT",
            },
          }),
        },
        ...(city.request_url && { termsOfService: city.request_url }),
        ...(city.cost && {
          // cost e payment_method sono testo libero inserito dalla community:
          // restano descrizione, non price/priceCurrency, che richiederebbero
          // un parsing degli importi che non possiamo garantire.
          offers: {
            "@type": "Offer",
            description: [city.cost, city.payment_method].filter(Boolean).join(" — "),
            ...(city.request_url && { url: city.request_url }),
          },
        }),
      },
    },
  ];

  // Anticipa in SERP la risposta più cercata: serve o no il permesso.
  const verdict = city.needs_display ? "serve il permesso" : "accesso libero";
  const pageTitle = `ZTL ${city.name} auto elettriche: ${verdict}, costi e regole | ${SITE_NAME}`;
  const metaDescription = [
    `ZTL ${city.name} e auto elettriche: ${city.needs_display ? "serve esporre il contrassegno" : "accesso senza permesso"}, ${city.free_parking ? "sosta gratuita" : "sosta a pagamento"}.`,
    city.cost ? `Costo: ${city.cost}.` : "",
    "Documenti, orari dell'ufficio comunale e contatti.",
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 158);

  return (
    <>
      <Seo
        title={pageTitle}
        description={metaDescription}
        path={canonicalPath}
        jsonLd={structuredData}
      />

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Torna alla mappa
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-bold mb-2">ZTL Elettrica {city.name}</h1>
            <p className="text-xl opacity-90 mb-4">{city.region}</p>
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              {!city.needs_display ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span className="font-medium">Accesso Automatico</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-300" />
                  <span className="font-medium">Richiede Permesso</span>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informazioni ZTL */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Info className="h-6 w-6 text-blue-600" />
                    Informazioni ZTL
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {city.description && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-3 text-gray-800">Descrizione</h2>
                      <p className="text-gray-600 leading-relaxed">{city.description}</p>
                    </div>
                  )}
                  {city.duration && (
                    <div>
                      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                        <Clock className="h-5 w-5 text-blue-600" />
                        Durata
                      </h2>
                      <p className="text-gray-600">{city.duration}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contatti */}
              {(city.phone || city.email) && (
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Phone className="h-6 w-6 text-purple-600" />
                      Contatti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {city.phone && (
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <Phone className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="font-semibold text-gray-800">Telefono</p>
                            <p className="text-gray-600">{city.phone}</p>
                          </div>
                        </div>
                      )}
                      {city.email && (
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <Mail className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="font-semibold text-gray-800">Email</p>
                            <p className="text-gray-600">{city.email}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sportello Fisico */}
              {city.office_address && (
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-orange-600" />
                      Sportello Fisico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="h-6 w-6 text-orange-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">Indirizzo</p>
                        <p className="text-gray-600 mb-3">{city.office_address}</p>
                        {city.office_hours && (
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">Orari</p>
                            <p className="text-gray-600">{city.office_hours}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* FAQ Section */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Info className="h-6 w-6 text-indigo-600" />
                    Domande Frequenti
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-800">Come funziona l'accesso ZTL per veicoli elettrici a {city.name}?</h3>
                      <p className="text-gray-600">
                        {!city.needs_display 
                          ? `I veicoli elettrici possono accedere automaticamente alla ZTL di ${city.name} senza necessità di permessi speciali.`
                          : `Per accedere alla ZTL di ${city.name} con un veicolo elettrico è necessario richiedere un'autorizzazione specifica.`
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-800">Quali documenti servono per la ZTL elettrica a {city.name}?</h3>
                      <p className="text-gray-600">
                        {city.required_documents || `Contatta direttamente il comune di ${city.name} per informazioni sui documenti necessari.`}
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-800">Ci sono costi per l'accesso ZTL elettrica a {city.name}?</h3>
                      <p className="text-gray-600">
                        {city.cost || `Contatta il comune di ${city.name} per informazioni sui costi dell'autorizzazione ZTL elettrica.`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Zone e Accessi */}
              {(city.parking_zones_description || city.ztl_access_description) && (
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Car className="h-5 w-5 text-green-600" />
                      Zone e Accessi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {city.parking_zones_description && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h3 className="font-semibold mb-2 text-gray-800">Zone di sosta</h3>
                          <p className="text-gray-600 text-sm">{city.parking_zones_description}</p>
                        </div>
                      )}
                      {city.ztl_access_description && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h3 className="font-semibold mb-2 text-gray-800">Accesso ZTL</h3>
                          <p className="text-gray-600 text-sm">{city.ztl_access_description}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Costi e Pagamento */}
              {(city.cost || city.payment_method) && (
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Euro className="h-5 w-5 text-yellow-600" />
                      Costi e Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {city.cost && (
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="font-semibold text-gray-800">Costo</p>
                          <p className="text-gray-600 text-sm">{city.cost}</p>
                        </div>
                      )}
                      {city.payment_method && (
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <p className="font-semibold text-gray-800">Metodo di pagamento</p>
                          <p className="text-gray-600 text-sm">{city.payment_method}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documenti e Requisiti */}
              {(city.required_documents || city.requirements) && (
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Documenti e Requisiti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {city.required_documents && (
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h3 className="font-semibold mb-2 text-gray-800">Documenti</h3>
                          <p className="text-gray-600 text-sm">{city.required_documents}</p>
                        </div>
                      )}
                      {city.requirements && (
                        <div className="p-3 bg-pink-50 rounded-lg">
                          <h3 className="font-semibold mb-2 text-gray-800">Requisiti</h3>
                          <p className="text-gray-600 text-sm">{city.requirements}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Note */}
              {city.notes && (
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
                    <CardTitle className="text-xl">Note Aggiuntive</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-sm">{city.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA Richiesta Online */}
              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Richiesta Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4 text-sm">
                    Accedi al portale ufficiale per richiedere l'autorizzazione ZTL elettrica.
                  </p>
                  <Button asChild className="w-full bg-white text-blue-600 hover:bg-gray-100" size="lg">
                    <a href={city.request_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visita il sito ufficiale
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <ZtlExplainer />

          {/* Provenienza del dato: su un tema dove un'informazione sbagliata
              costa una multa, la data e la fonte sono parte del contenuto. */}
          <section className="mt-8 rounded-lg border bg-white p-6">
            <h2 className="text-lg font-semibold mb-3">Affidabilità di questi dati</h2>
            {modified && (
              <p className="text-sm text-muted-foreground mb-2">
                Ultimo aggiornamento:{" "}
                <time dateTime={new Date(modified).toISOString().slice(0, 10)}>
                  {new Date(modified).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </p>
            )}
            <p className="text-sm text-muted-foreground mb-4">
              I dati sono raccolti dalla community e verificati sulle fonti comunali.
              Le regole ZTL cambiano per delibera: prima di accedere verifica sempre
              sul sito ufficiale del Comune.
            </p>
            <div className="flex flex-wrap gap-3">
              {city.request_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={city.request_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-3.5 w-3.5" />
                    Fonte ufficiale del Comune
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`mailto:info@auroradigital.it?subject=${encodeURIComponent(
                    `Correzione dati ZTL ${city.name}`,
                  )}`}
                >
                  <AlertCircle className="mr-2 h-3.5 w-3.5" />
                  Segnala un errore
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/citta">Vedi tutte le città</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default CityPage; 