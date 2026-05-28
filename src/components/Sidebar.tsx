import Link from "next/link";

const menu = [
  { href: "/", label: "Vale Transporte / Ajuda de Custo" },
  { href: "/desligamento", label: "Ficha de Desligamento" },
  { href: "/declaracao-escolaridade", label: "Declaração de Escolaridade" },
  { href: "/carta-santander", label: "Carta Santander - Terceirizações" },
];

export function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b">
        <p className="text-xs font-bold tracking-[0.25em] text-blue-700 uppercase">
          Documentos
        </p>
  
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}