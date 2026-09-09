import { Link } from "react-router-dom";
import explainer from "@/data/ztl-explainer.json";

/**
 * Rimando breve alla guida generale, sulle schede città.
 *
 * La versione integrale di questo testo viveva qui, ripetuta su tutte e 65 le
 * schede: portava il conteggio parole da 234 a 643, ma faceva crollare l'unicità
 * dal 29,8% al 5,7% e generava 864 coppie di pagine simili oltre l'80%. Contenuto
 * condiviso ripetuto a tappeto è esattamente il profilo che le policy sui
 * contenuti generati su scala penalizzano. Il testo completo sta ora su una
 * pagina sola, e da qui la si linka.
 */
const ZtlExplainer = () => (
  <aside className="mt-8 rounded-lg border bg-white p-6">
    <h2 className="text-lg font-semibold mb-2">{explainer.heading}</h2>
    <p className="text-sm text-muted-foreground mb-4">{explainer.teaser}</p>
    <Link
      to="/come-funziona-una-ztl"
      className="text-sm text-primary hover:underline"
    >
      Leggi la guida completa alle ZTL italiane
    </Link>
  </aside>
);

export default ZtlExplainer;
