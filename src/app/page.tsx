'use client'

import csvtojson from 'csvtojson' ;
import { useEffect, useState } from 'react';

export async function buildData() {
    const res = await fetch("https://raw.githubusercontent.com/emys-alb/votos-senado-api/main/data/votos.csv")
      const csv = await csvtojson().fromString(await res.text())
     
      return csv.slice(0, 15)
}

export default function Main() {

  const [votos, setVotos] = useState<any>([])

  useEffect(() => {
    buildData()
      .then(data => setVotos(data))
  },[])

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
          {votos.map((voto: any) => (
            <article key={voto} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={voto.data_votacao} className="text-gray-500">
                  {voto.date}
                </time>
                <a
                  href={voto.link}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {voto.status_votacao}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={voto.link}>
                    <span className="absolute inset-0" />
                    {voto.materia}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{voto.descricao}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

