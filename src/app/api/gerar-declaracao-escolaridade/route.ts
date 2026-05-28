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
    "declaracao-escolaridade.pdf"
  );

  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.getPages()[0];

  function texto(valor: string, x: number, y: number, size = 12) {
    page.drawText(valor || "", {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  }

// NOME
texto(body.nome, 330, 575, 12);

// RG e CPF
texto(body.rg, 205, 553, 12);
texto(body.cpf, 380, 553, 12);

// DATA
texto(body.dia, 126, 373, 12);
texto(body.mes, 163, 373, 12);
texto(body.ano, 200, 373, 12);

// CIDADE
texto(body.cidade, 145, 344, 12);

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=declaracao-escolaridade.pdf",
    },
  });
}