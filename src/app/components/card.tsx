
export interface Voto {
  data: string
  descricao: string
  status: string
  materia: string
  link: string
}

export default function Card({ voto }: { voto: Voto }) {

  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={voto.data} className="text-gray-500">
          {voto.data}
        </time>
        <a
          href={voto.link}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {voto.status}
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
  )
}