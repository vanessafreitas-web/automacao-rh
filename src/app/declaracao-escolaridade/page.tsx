"use client";

import { useState } from "react";

export default function DeclaracaoEscolaridadePage() {
  const [form, setForm] = useState({
    nome: "",
    rg: "",
    cpf: "",
    cidade: "",
    dia: "",
    mes: "",
    ano: "",
  });

  function alterar(campo: string, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  async function gerarPDF() {
    const response = await fetch("/api/gerar-declaracao-escolaridade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `declaracao-escolaridade-${form.nome || "colaborador"}.pdf`;
    a.click();
  }

  return (
    <div className="mx-auto max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-black mb-2">
        Declaração de Escolaridade
      </h1>

      <p className="text-gray-500 mb-8">
        Preencha os dados para gerar a declaração automaticamente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-3 rounded-xl" placeholder="Nome completo" value={form.nome} onChange={(e) => alterar("nome", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="RG" value={form.rg} onChange={(e) => alterar("rg", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="CPF" value={form.cpf} onChange={(e) => alterar("cpf", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Cidade" value={form.cidade} onChange={(e) => alterar("cidade", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Dia" value={form.dia} onChange={(e) => alterar("dia", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Mês" value={form.mes} onChange={(e) => alterar("mes", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Ano" value={form.ano} onChange={(e) => alterar("ano", e.target.value)} />
      </div>

      <button
        onClick={gerarPDF}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-2xl font-bold"
      >
        Gerar Declaração
      </button>
    </div>
  );
}