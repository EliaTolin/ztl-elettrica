import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'

interface CityPageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const supabase = createClient()
  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', params.city)
    .single()

  if (!city) {
    return {
      title: 'Città non trovata | ZTL Elettrica',
      description: 'La pagina richiesta non esiste'
    }
  }

  return {
    title: `ZTL Elettrica ${city.name} | Informazioni e Regolamenti`,
    description: `Scopri tutte le informazioni sulla ZTL Elettrica di ${city.name}. Orari, regolamenti, esenzioni e come ottenere l'autorizzazione.`,
    openGraph: {
      title: `ZTL Elettrica ${city.name} | Informazioni e Regolamenti`,
      description: `Scopri tutte le informazioni sulla ZTL Elettrica di ${city.name}. Orari, regolamenti, esenzioni e come ottenere l'autorizzazione.`,
      type: 'website',
      locale: 'it_IT',
    }
  }
}

export async function generateStaticParams() {
  const supabase = createClient()
  const { data: cities } = await supabase
    .from('cities')
    .select('slug')

  return cities?.map((city) => ({
    city: city.slug,
  })) || []
}

export default async function CityPage({ params }: CityPageProps) {
  const supabase = createClient()
  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', params.city)
    .single()

  if (!city) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">ZTL Elettrica {city.name}</h1>
      
      <div className="grid gap-8">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Informazioni Generali</h2>
          <div className="prose max-w-none">
            <p>{city.description}</p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Orari e Regolamenti</h2>
          <div className="prose max-w-none">
            <p>{city.regulations}</p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Come Ottenere l'Autorizzazione</h2>
          <div className="prose max-w-none">
            <p>{city.authorization_info}</p>
          </div>
        </section>
      </div>
    </main>
  )
} 