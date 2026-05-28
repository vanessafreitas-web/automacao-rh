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
    diaAdmissao: "",
    mesAdmissao: "",
    anoAdmissao: "",
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
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-700">
          Documentos RH
        </p>

        <h1 className="mt-2 text-4xl font-black text-gray-900">
          Carta Santander
        </h1>

        <p className="mt-2 text-gray-500">
          Gere automaticamente a carta de abertura de conta salário.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-5">
          <h2 className="text-lg font-bold text-white">
            Dados da carta
          </h2>

          <p className="text-sm text-blue-100">
            Preencha as informações que serão inseridas no modelo oficial.
          </p>
        </div>

        <div className="space-y-8 p-8">
          <section>
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
              Cabeçalho
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Cidade/UF da carta"
                value={form.cidadeCarta}
                onChange={(e) => alterar("cidadeCarta", e.target.value)}
              />

              <input
                className="input"
                placeholder="Data por extenso. Ex: 26 de maio de 2026"
                value={form.dataExtenso}
                onChange={(e) => alterar("dataExtenso", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
              Dados do funcionário
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Nome completo"
                value={form.nome}
                onChange={(e) => alterar("nome", e.target.value)}
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
          </section>

          <section>
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
              Admissão
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <input
                className="input"
                placeholder="Dia"
                value={form.diaAdmissao}
                onChange={(e) => alterar("diaAdmissao", e.target.value)}
              />

              <input
                className="input"
                placeholder="Mês"
                value={form.mesAdmissao}
                onChange={(e) => alterar("mesAdmissao", e.target.value)}
              />

              <input
                className="input"
                placeholder="Ano"
                value={form.anoAdmissao}
                onChange={(e) => alterar("anoAdmissao", e.target.value)}
              />

              <input
                className="input md:col-span-1"
                placeholder="Cargo"
                value={form.cargo}
                onChange={(e) => alterar("cargo", e.target.value)}
              />

              <input
                className="input md:col-span-1"
                placeholder="Salário. Ex: 1.651,00"
                value={form.salario}
                onChange={(e) => alterar("salario", e.target.value)}
              />
            </div>
          </section>

          <button
            onClick={gerarPDF}
            className="w-full rounded-2xl bg-blue-700 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-blue-800"
          >
            Gerar Carta Santander
          </button>
        </div>
      </div>
    </div>
  );
}