"use client";

import { useState } from "react";

export default function DeclaracaoResidenciaPage() {
  const [form, setForm] = useState({
    nome: "",
    rg: "",
    cpf: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: "",
    dia: "",
    mes: "",
    ano: "",
  });

  function alterar(campo: string, valor: string) {
    setForm({
      ...form,
      [campo]: valor,
    });
  }

  async function gerarPDF() {
    const response = await fetch(
      "/api/gerar-declaracao-residencia",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `declaracao-residencia-${form.nome}.pdf`;
    a.click();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-700">
          Documentos RH
        </p>

        <h1 className="mt-2 text-4xl font-black text-gray-900">
          Declaração de Residência
        </h1>
      </div>

      <div className="rounded-3xl bg-white shadow-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="input"
            placeholder="Nome completo"
            value={form.nome}
            onChange={(e) => alterar("nome", e.target.value)}
          />

          <input
            className="input"
            placeholder="RG"
            value={form.rg}
            onChange={(e) => alterar("rg", e.target.value)}
          />

          <input
            className="input"
            placeholder="CPF"
            value={form.cpf}
            onChange={(e) => alterar("cpf", e.target.value)}
          />

          <input
            className="input"
            placeholder="Rua"
            value={form.rua}
            onChange={(e) => alterar("rua", e.target.value)}
          />

          <input
            className="input"
            placeholder="Número"
            value={form.numero}
            onChange={(e) => alterar("numero", e.target.value)}
          />

          <input
            className="input"
            placeholder="Bairro"
            value={form.bairro}
            onChange={(e) => alterar("bairro", e.target.value)}
          />

          <input
            className="input"
            placeholder="Cidade"
            value={form.cidade}
            onChange={(e) => alterar("cidade", e.target.value)}
          />

          <input
            className="input"
            placeholder="CEP"
            value={form.cep}
            onChange={(e) => alterar("cep", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <input
            className="input"
            placeholder="Dia"
            value={form.dia}
            onChange={(e) => alterar("dia", e.target.value)}
          />

          <input
            className="input"
            placeholder="Mês"
            value={form.mes}
            onChange={(e) => alterar("mes", e.target.value)}
          />

          <input
            className="input"
            placeholder="Ano"
            value={form.ano}
            onChange={(e) => alterar("ano", e.target.value)}
          />
        </div>

        <button
          onClick={gerarPDF}
          className="mt-6 w-full rounded-2xl bg-blue-700 px-6 py-4 font-black text-white"
        >
          Gerar PDF
        </button>
      </div>
    </div>
  );
}