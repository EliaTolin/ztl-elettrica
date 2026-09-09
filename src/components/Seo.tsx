import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://ztlelettrica.it";
export const SITE_NAME = "ZTL Elettrica Italia";
const DEFAULT_IMAGE = `${SITE_URL}/assets/preview.png`;

interface SeoProps {
  title: string;
  description: string;
  /** Percorso assoluto interno, es. "/citta/firenze". Genera il canonical self-referencing. */
  path: string;
  image?: string;
  noindex?: boolean;
  /** JSON-LD da iniettare nella pagina. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Meta tag per pagina. Sovrascrive i valori statici di index.html, che restano
 * solo come fallback per i crawler che non eseguono JavaScript.
 */
const Seo = ({ title, description, path, image, noindex, jsonLd }: SeoProps) => {
  const canonical = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image ?? DEFAULT_IMAGE} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image ?? DEFAULT_IMAGE} />

      {blocks.map((block, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
