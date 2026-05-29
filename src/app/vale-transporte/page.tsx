"use client";

import { useState } from "react";

export default function ValeTransportePage() {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    posto: "",
    dia: "",
    mes: "",
    ano: "",
    observacao: "OS 40072026 - VALOR FIXO 300,00",

    transporteIda: "DINHEIRO",
    valorIda: "",

    transporteVolta: "DINHEIRO",
    valorVolta: "",
  });

  function alterar(campo: string, valor: string) {
    setForm({
      ...form,
      [campo]: valor,
    });
  }

  async function gerarPDF() {
    const response = await fetch("/api/gerar-pdf", {
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
    a.download = `vale-transporte-${form.nome || "colaborador"}.pdf`;
    a.click();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-700">
          Documentos RH
        </p>

        <h1 className="mt-2 text-4xl font-black text-gray-900">
          Vale Transporte / Ajuda de Custo
        </h1>

        <p className="mt-2 text-gray-500">
          Preencha os dados abaixo para gerar automaticamente o documento oficial.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-5">
          <h2 className="text-lg font-bold text-white">
            Dados do colaborador
          </h2>

          <p className="text-sm text-blue-100">
            Informações principais para emissão do documento.
          </p>
        </div>

        <div className="space-y-8 p-8">
          <section>
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
              Identificação
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
                placeholder="Cliente / Posto atual"
                value={form.posto}
                onChange={(e) => alterar("posto", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
              Endereço
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <input
                className="input md:col-span-2"
                placeholder="Endereço"
                value={form.endereco}
                onChange={(e) => alterar("endereco", e.target.value)}
              />

              <input
                className="input"
                placeholder="Número"
                value={form.numero}
                onChange={(e) => alterar("numero", e.target.value)}
              />

              <input
                className="input"
                placeholder="CEP"
                value={form.cep}
                onChange={(e) => alterar("cep", e.target.value)}
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
                placeholder="Estado"
                value={form.estado}
                onChange={(e) => alterar("estado", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
              Admissão e observação
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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

              <input
                className="input"
                placeholder="Observação / OS"
                value={form.observacao}
                onChange={(e) => alterar("observacao", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
              Transporte
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select
                className="input"
                value={form.transporteIda}
                onChange={(e) => alterar("transporteIda", e.target.value)}
              >
                <option value="DINHEIRO">IDA - Dinheiro</option>
                <option value="CARTÃO">IDA - Cartão</option>
                <option value="VALE TRANSPORTE">IDA - Vale Transporte</option>
              </select>

              <input
                className="input"
                placeholder="Valor ida"
                value={form.valorIda}
                onChange={(e) => alterar("valorIda", e.target.value)}
              />

              <select
                className="input"
                value={form.transporteVolta}
                onChange={(e) => alterar("transporteVolta", e.target.value)}
              >
                <option value="DINHEIRO">VOLTA - Dinheiro</option>
                <option value="CARTÃO">VOLTA - Cartão</option>
                <option value="VALE TRANSPORTE">VOLTA - Vale Transporte</option>
              </select>

              <input
                className="input"
                placeholder="Valor volta"
                value={form.valorVolta}
                onChange={(e) => alterar("valorVolta", e.target.value)}
              />
            </div>
          </section>

          <button
            onClick={gerarPDF}
            className="w-full rounded-2xl bg-blue-700 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-blue-800"
          >
            Gerar PDF
          </button>
        </div>
      </div>
    </div>
  );
}