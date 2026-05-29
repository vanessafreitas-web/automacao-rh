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
    "declaracao-residencia.pdf"
  );

  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.getPages()[0];

  function texto(valor: string, x: number, y: number, size = 9) {
    page.drawText(valor || "", {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // NOME
  texto(body.nome, 112, 461, 14);

  // RG
  texto(body.rg, 198, 431, 14);

  // CPF
  texto(body.cpf, 393, 431, 14);

  // RUA
  texto(body.rua, 92, 391, 14);

  // NÚMERO
  texto(body.numero, 292, 391, 12);

  // BAIRRO
  texto(body.bairro, 372, 391, 14);

  // CIDADE
  texto(body.cidade, 175, 373, 14);

  // CEP
  texto(body.cep, 370, 373, 14);

  // DATA
  texto(body.dia, 122, 145, 14);
  texto(body.mes, 156, 145, 14);
  texto(body.ano, 190, 145, 14);

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=declaracao-residencia.pdf",
    },
  });
}