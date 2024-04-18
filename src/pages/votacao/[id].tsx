import Card, { Voto } from "@/app/components/card";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import "../../app/globals.css";

interface Params extends ParsedUrlQuery {
  id: string;
}

export async function buildData() {
  const res = await fetch("https://raw.githubusercontent.com/emys-alb/votos-senado/main/out/dados.json")
  return res.json()
}

export default function VotosPage({ votos }: InferGetStaticPropsType<typeof getStaticProps>) {

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
            <Card voto={voto} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const votacao = await buildData();
  const pages = Math.ceil(votacao.length / 12.0)
  const indexes = Array.from({ length: pages }, (_, i) => i + 1)

  const paths = indexes.map((item: number) => ({
    params: { id: `${item}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = (async (context) => {
  const { id } = context.params as Params;
  const votacao: [Voto] = await buildData();

  const intId = parseInt(id);

  const votos = votacao.slice(intId * 12, (intId + 1) * 12)

  return {
    props: {
      votos: votos,
    },
  };
}) satisfies GetStaticProps<{ votos: Voto[] }>
