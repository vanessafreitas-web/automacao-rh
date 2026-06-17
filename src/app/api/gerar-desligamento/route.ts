import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();

  const pdfPath = path.join(
    process.cwd(),
    "public",
    "modelos",
    "ficha-desligamento.pdf"
  );

  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.getPages()[0];

  function texto(valor: string, x: number, y: number, size = 8) {
    page.drawText(valor || "", {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  }

  function check(x: number, y: number) {
    page.drawText("X", {
      x,
      y,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // PRIMEIRA FICHA - DADOS
  texto(body.nome, 82, 744, 8);
  texto(body.re, 350, 744, 8);
  texto(body.celular, 462, 744, 8);

  // DESCRIÇÃO DO MOTIVO
  texto(body.descricao, 55, 560, 8);

  // DATA DA PRIMEIRA FICHA
texto(body.dia, 65, 520, 9);
texto(body.mes, 88, 520, 9);
texto(body.ano, 105, 520, 9);

  // MOTIVOS - PRIMEIRA FICHA
  const motivos: Record<string, [number, number]> = {
    "Melhor oportunidade de emprego": [70, 710],
    "Mudança de cidade": [292, 710],

    "Abertura de negócio próprio": [70, 696],
    "Aposentadoria": [292, 696],

    "Ambiente de trabalho": [70, 682],
    "Relacionamento interpessoal": [292, 682],

    "Troca de posto/turno": [70, 668],
    "Insatisfação com pagamento/benefícios": [292, 668],

    "Saúde / qualidade de vida": [70, 654],
    "Estudos / qualificação": [292, 654],

    "Encerramento posto": [70, 640],
    "Questões pessoais": [292, 640],

    "Perspectiva de crescimento": [70, 626],
  };

  const coordenada = motivos[body.motivo];

  if (coordenada) {
    check(coordenada[0], coordenada[1]);
  }

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=ficha-desligamento.pdf",
    },
  });
}