'use server'

import Card, { Voto } from './components/card';


export async function buildData() {
    const res = await fetch("https://raw.githubusercontent.com/emys-alb/votos-senado/main/out/dados.json")
    return res.json()
}

export default async function Main() {

  const votos: [Voto] = await buildData()

  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Últimas votações</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            As <a href="https://www.congressonacional.leg.br/legislacao-e-publicacoes/glossario-legislativo/-/legislativo/termo/votacao_nominal">votações nominais</a> mais recentes do Senado Federal.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {votos.map((voto: Voto, index) => (
            <Card voto={voto} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}
