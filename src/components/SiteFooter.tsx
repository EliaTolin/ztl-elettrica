import { cn } from "@/lib/utils";

const CREDIT_URL =
  "https://eliatolin.com/?utm_source=ztlelettrica.it&utm_medium=referral&utm_content=footer";

/** Footer condiviso da tutte le pagine: disclaimer e credito all'autore. */
const SiteFooter = ({ className }: { className?: string }) => (
  <footer className={cn("bg-white border-t py-4", className)}>
    <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-1">
      <p>© 2025 ZTL Elettrica Italia - Le informazioni fornite potrebbero variare, consulta sempre i siti ufficiali dei comuni.</p>
      <p className="text-xs">
        Made by{" "}
        <a href={CREDIT_URL} target="_blank" rel="noopener" className="font-medium hover:text-foreground hover:underline">
          Elia Tolin
        </a>
      </p>
    </div>
  </footer>
);

export default SiteFooter;
