import Link from "next/link";
import {
  LayoutDashboard,
  Bus,
  UserX,
  GraduationCap,
  Building2,
  Home,
} from "lucide-react";

const menu = [
  { href: "/", label: "Início", icon: LayoutDashboard },
  { href: "/vale-transporte", label: "Vale Transporte / Ajuda de Custo", icon: Bus },
  { href: "/desligamento", label: "Ficha de Desligamento", icon: UserX },
  { href: "/declaracao-escolaridade", label: "Declaração de Escolaridade", icon: GraduationCap },
  { href: "/carta-santander", label: "Carta Santander", icon: Building2 },
  { href: "/declaracao-residencia", label: "Declaração de Residência", icon: Home },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 bg-white/90 shadow-sm backdrop-blur">
      <div className="border-b p-6">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-700">
          Documentos
        </p>

        <h2 className="mt-2 text-lg font-black text-gray-950">
          Painel RH
        </h2>
      </div>

      <nav className="space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-blue-50 hover:text-blue-800"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}