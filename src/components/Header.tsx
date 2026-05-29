export function Header() {
  return (
    <header className="h-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 text-white shadow-xl">
      <div className="flex h-full items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
          </h1>

          <p className="mt-1 text-xs text-blue-100">
            Sistema interno de geração automática de documentos
          </p>
        </div>

        <div className="hidden rounded-2xl bg-white/10 px-4 py-2 text-right md:block">
          <p className="text-sm font-black"></p>
          <p className="text-xs text-blue-100">Ambiente local</p>
        </div>
      </div>
    </header>
  );
}