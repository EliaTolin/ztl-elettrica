import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      {/* Netlify serve la SPA con status 200 su qualunque path: senza noindex
          ogni URL inesistente sarebbe indicizzabile come copia della home. */}
      <Seo
        title="Pagina non trovata | ZTL Elettrica Italia"
        description="La pagina richiesta non esiste."
        path={location.pathname}
        noindex
      />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-xl">
        <div className="text-9xl font-bold mb-4 animate-bounce">
          4😵4
        </div>
        <h1 className="text-3xl font-bold mb-4 text-purple-600">
          Ops! Ti sei perso?
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Questa pagina è andata a fare un giro in vespa... 
          <br />
          Ma non preoccuparti, puoi sempre tornare a casa!
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600 transform hover:scale-105 transition-all duration-200"
        >
          🏠 Torna alla Home
        </a>
      </div>
    </div>
    </>
  );
};

export default NotFound;
