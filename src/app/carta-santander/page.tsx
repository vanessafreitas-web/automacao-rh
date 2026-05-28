"use client";

import { useState } from "react";

export default function CartaSantanderPage() {
  const [form, setForm] = useState({
    cidadeCarta: "Campo Grande MS",
    dataExtenso: "",
    nome: "",
    cpf: "",
    rua: "",
    numero: "",
    cidade: "",
    cep: "",
    dataAdmissao: "",
    cargo: "",
    salario: "",
  });

  function alterar(campo: string, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  async function gerarPDF() {
    const response = await fetch("/api/gerar-carta-santander", {
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
    a.download = `carta-santander-${form.nome || "colaborador"}.pdf`;
    a.click();
  }

  return (
    <div className="mx-auto max-w-5xl bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-black mb-2">Carta Santander</h1>

      <p className="text-gray-500 mb-8">
        Gere automaticamente a carta de abertura de conta salário.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-3 rounded-xl" placeholder="Cidade/UF da carta" value={form.cidadeCarta} onChange={(e) => alterar("cidadeCarta", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Data por extenso. Ex: 26 de maio de 2026" value={form.dataExtenso} onChange={(e) => alterar("dataExtenso", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Nome completo" value={form.nome} onChange={(e) => alterar("nome", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="CPF" value={form.cpf} onChange={(e) => alterar("cpf", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Rua" value={form.rua} onChange={(e) => alterar("rua", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Número" value={form.numero} onChange={(e) => alterar("numero", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Cidade" value={form.cidade} onChange={(e) => alterar("cidade", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="CEP" value={form.cep} onChange={(e) => alterar("cep", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Data de admissão. Ex: 26/05/2026" value={form.dataAdmissao} onChange={(e) => alterar("dataAdmissao", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Cargo" value={form.cargo} onChange={(e) => alterar("cargo", e.target.value)} />
        <input className="border p-3 rounded-xl" placeholder="Salário. Ex: 1.651,00" value={form.salario} onChange={(e) => alterar("salario", e.target.value)} />
      </div>

      <button
        onClick={gerarPDF}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-2xl font-bold"
      >
        Gerar Carta Santander
      </button>
    </div>
  );
}