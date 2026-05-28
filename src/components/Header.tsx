export function Header() {
  return (
    <header className="h-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-lg">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
    
          <p className="text-xs text-blue-100 mt-1">
            Sistema interno de geração automática de documentos
          </p>
        </div>

        <div className="hidden md:block text-right">
          <p className="text-sm font-bold"></p>
          <p className="text-xs text-blue-100"></p>
        </div>
      </div>
    </header>
  );
}