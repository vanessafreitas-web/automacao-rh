import Link from "next/link";
import {
  Bus,
  UserX,
  GraduationCap,
  Home,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const documentos = [
  {
    titulo: "Vale Transporte / Ajuda de Custo",
    descricao: "Gere solicitações de VT e ajuda de custo no modelo oficial.",
    href: "/vale-transporte",
    icon: Bus,
    cor: "from-blue-600 to-blue-800",
    bg: "bg-blue-50",
  },
  {
    titulo: "Ficha de Desligamento",
    descricao: "Preencha o motivo principal e gere a ficha de desligamento.",
    href: "/desligamento",
    icon: UserX,
    cor: "from-red-500 to-red-700",
    bg: "bg-red-50",
  },
  {
    titulo: "Carta Santander",
    descricao: "Carta para abertura de conta salário Santander.",
    href: "/carta-santander",
    icon: Building2,
    cor: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    titulo: "Declaração de Escolaridade",
    descricao: "Declaração com nome, RG, CPF, cidade e data.",
    href: "/declaracao-escolaridade",
    icon: GraduationCap,
    cor: "from-purple-500 to-purple-700",
    bg: "bg-purple-50",
  },
  {
    titulo: "Declaração de Residência",
    descricao: "Preencha endereço completo e gere a declaração.",
    href: "/declaracao-residencia",
    icon: Home,
    cor: "from-orange-500 to-orange-700",
    bg: "bg-orange-50",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <section className="mb-8 overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 p-10 text-white shadow-2xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-blue-100">
              <Sparkles size={16} />
              Sistema Interno
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="text-4xl font-black">5+</p>
              <p className="mt-1 text-sm text-blue-100">Documentos</p>
            </div>

            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="text-4xl font-black"></p>
              <p className="mt-1 text-sm text-blue-100"></p>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-700">
          Documentos disponíveis
        </p>

        <h2 className="mt-2 text-2xl font-black text-gray-900">
          Escolha o documento
        </h2>
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {documentos.map((doc) => {
          const Icon = doc.icon;

          return (
            <Link
              key={doc.href}
              href={doc.href}
              className="group relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${doc.bg}`}
              >
                <div
                  className={`rounded-xl bg-gradient-to-r ${doc.cor} p-3 text-white shadow-lg`}
                >
                  <Icon size={22} />
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-950">
                {doc.titulo}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {doc.descricao}
              </p>

              <div className="mt-6 flex items-center gap-2 font-black text-blue-700">
                Abrir documento
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </div>

              <div
                className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-r ${doc.cor} opacity-10`}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
}