"use client";

import { useState } from "react";

const motivos = [
  "Melhor oportunidade de emprego",
  "Mudança de cidade",
  "Abertura de negócio próprio",
  "Aposentadoria",
  "Ambiente de trabalho",
  "Relacionamento interpessoal",
  "Troca de posto/turno",
  "Insatisfação com pagamento/benefícios",
  "Saúde / qualidade de vida",
  "Estudos / qualificação",
  "Encerramento posto",
  "Questões pessoais",
  "Perspectiva de crescimento",
];

export default function DesligamentoPage() {
  const [form, setForm] = useState({
    nome: "",
    re: "",
    celular: "",
    motivo: "",
    descricao: "",
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
    const response = await fetch("/api/gerar-desligamento", {
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
    a.download = `desligamento-${form.nome || "colaborador"}.pdf`;

    a.click();
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-black mb-2">
          Ficha de Avaliação de Desligamento
        </h1>

        <p className="text-gray-500 mb-8">
          Gere automaticamente fichas de desligamento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded-xl"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => alterar("nome", e.target.value)}
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="RE"
            value={form.re}
            onChange={(e) => alterar("re", e.target.value)}
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Celular"
            value={form.celular}
            onChange={(e) => alterar("celular", e.target.value)}
          />

          <select
            className="border p-3 rounded-xl"
            value={form.motivo}
            onChange={(e) => alterar("motivo", e.target.value)}
          >
            <option value="">
              Selecione o motivo principal
            </option>

            {motivos.map((motivo) => (
              <option key={motivo} value={motivo}>
                {motivo}
              </option>
            ))}
          </select>

          <input
            className="border p-3 rounded-xl"
            placeholder="Dia"
            value={form.dia}
            onChange={(e) => alterar("dia", e.target.value)}
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Mês"
            value={form.mes}
            onChange={(e) => alterar("mes", e.target.value)}
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Ano"
            value={form.ano}
            onChange={(e) => alterar("ano", e.target.value)}
          />
        </div>

        <textarea
          className="border p-4 rounded-2xl w-full mt-4 min-h-[180px]"
          placeholder="Descrição do motivo (não obrigatório)"
          value={form.descricao}
          onChange={(e) => alterar("descricao", e.target.value)}
        />

        <button
          onClick={gerarPDF}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white p-4 rounded-2xl font-bold"
        >
          Gerar Ficha de Desligamento
        </button>
      </div>
    </main>
  );
}