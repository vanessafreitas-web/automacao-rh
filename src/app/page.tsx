"use client";

import { useState } from "react";
import { Download, FileText, Home, GraduationCap, Bus } from "lucide-react";

export default function HomePage() {
  const [form, setForm] = useState({
    nome: "",
    rg: "",
    cpf: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "MS",
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
    setForm({ ...form, [campo]: valor });
  }

  async function baixarPDF(api: string, nomeArquivo: string) {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        rua: form.endereco,
      }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  async function baixarAjudaCusto() {
    await baixarPDF(
      "/api/gerar-pdf",
      `ajuda-custo-${form.nome || "colaborador"}.pdf`
    );
  }

  async function baixarEscolaridade() {
    await baixarPDF(
      "/api/gerar-declaracao-escolaridade",
      `declaracao-escolaridade-${form.nome || "colaborador"}.pdf`
    );
  }

  async function baixarResidencia() {
    await baixarPDF(
      "/api/gerar-declaracao-residencia",
      `declaracao-residencia-${form.nome || "colaborador"}.pdf`
    );
  }

  async function baixarTodos() {
    await baixarAjudaCusto();

    setTimeout(async () => {
      await baixarEscolaridade();
    }, 500);

    setTimeout(async () => {
      await baixarResidencia();
    }, 1000);
  }

  return (
    <div className="mx-auto max-w-7xl">


      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-5">
            <h2 className="text-lg font-bold text-white">
              Dados do colaborador
            </h2>

            <p className="text-sm text-blue-100">
              Essas informações serão usadas nos documentos selecionados.
            </p>
          </div>

          <div className="space-y-8 p-8">
            <section>
              <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
                Identificação
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  className="input md:col-span-2"
                  placeholder="Nome completo"
                  value={form.nome}
                  onChange={(e) => alterar("nome", e.target.value)}
                />

                <input
                  className="input"
                  placeholder="Cliente / Posto"
                  value={form.posto}
                  onChange={(e) => alterar("posto", e.target.value)}
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
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-500">
                Endereço
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <input
                  className="input md:col-span-2"
                  placeholder="Rua / Endereço"
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
                Data e ajuda de custo
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

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <select
                  className="input"
                  value={form.transporteIda}
                  onChange={(e) => alterar("transporteIda", e.target.value)}
                >
                  <option value="DINHEIRO">IDA - Dinheiro</option>
                  <option value="CARTÃO">IDA - Cartão</option>
                  <option value="VALE TRANSPORTE">
                    IDA - Vale Transporte
                  </option>
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
                  <option value="VALE TRANSPORTE">
                    VOLTA - Vale Transporte
                  </option>
                </select>

                <input
                  className="input"
                  placeholder="Valor volta"
                  value={form.valorVolta}
                  onChange={(e) => alterar("valorVolta", e.target.value)}
                />
              </div>
            </section>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-black text-gray-950">
              Baixar documentos
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Escolha quais documentos deseja gerar com os dados preenchidos.
            </p>

            <div className="mt-6 space-y-3">
              <button
                onClick={baixarAjudaCusto}
                className="flex w-full items-center justify-between rounded-2xl bg-blue-700 px-5 py-4 font-black text-white shadow-lg transition hover:bg-blue-800"
              >
                <span className="flex items-center gap-3">
                  <Bus size={20} />
                  Ajuda de Custo
                </span>
                <Download size={18} />
              </button>

              <button
                onClick={baixarEscolaridade}
                className="flex w-full items-center justify-between rounded-2xl bg-purple-600 px-5 py-4 font-black text-white shadow-lg transition hover:bg-purple-700"
              >
                <span className="flex items-center gap-3">
                  <GraduationCap size={20} />
                  Declaração Escolaridade
                </span>
                <Download size={18} />
              </button>

              <button
                onClick={baixarResidencia}
                className="flex w-full items-center justify-between rounded-2xl bg-orange-600 px-5 py-4 font-black text-white shadow-lg transition hover:bg-orange-700"
              >
                <span className="flex items-center gap-3">
                  <Home size={20} />
                  Declaração Residência
                </span>
                <Download size={18} />
              </button>

              <button
                onClick={baixarTodos}
                className="flex w-full items-center justify-between rounded-2xl bg-gray-950 px-5 py-4 font-black text-white shadow-lg transition hover:bg-black"
              >
                <span className="flex items-center gap-3">
                  <FileText size={20} />
                  Baixar Todos
                </span>
                <Download size={18} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}