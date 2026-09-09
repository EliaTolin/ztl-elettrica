import guidesData from "@/data/guides.json";

export interface GuideFilter {
  field: string;
  equals?: boolean;
  notEmpty?: boolean;
}

export interface Guide {
  slug: string;
  /** "article" non filtra città: rende il testo esplicativo condiviso. */
  layout: "list" | "cost-table" | "article";
  filter: GuideFilter;
  navLabel: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  emptyLabel: string;
  detailField?: string;
  detailLabel?: string;
}

export const GUIDES = guidesData as Guide[];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

/**
 * Applica il filtro dichiarativo di una guida.
 *
 * La logica è volutamente identica a quella di scripts/prerender.mjs: le due
 * implementazioni leggono lo stesso guides.json, così l'elenco mostrato
 * all'utente e quello servito ai crawler non possono divergere.
 */
export const matchesFilter = (city: Record<string, unknown>, filter: GuideFilter) => {
  const value = city[filter.field];
  if (filter.notEmpty) return typeof value === "string" && value.trim() !== "";
  return value === filter.equals;
};

/** Heuristica su testo libero: `cost` non è un importo strutturato. */
export const isFreeCost = (cost?: string) => /gratuit|gratis|nessun costo/i.test(cost ?? "");
