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
    "vale-transporte.pdf"
  );

  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.getPages()[0];

  function texto(valor: string, x: number, y: number, size = 10) {
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
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // TOPO
  texto(body.nome, 85, 753, 10);
  texto(body.endereco, 137, 729, 10);
  texto(body.numero, 514, 729, 10);

  texto(body.bairro, 82, 703, 9);
  texto(body.cidade, 236, 704, 10);
  texto(body.estado, 402, 704, 10);
  texto(body.cep, 464, 704, 10);

  texto(body.posto, 162, 679, 8);

  texto(body.dia, 436, 679, 14);
  texto(body.mes, 482, 679, 14);
  texto(body.ano, 525, 679, 14);

  // MARCAR ADMISSÃO
check(402, 625

);
  // OBSERVAÇÃO / OS
  texto(body.observacao, 156, 579, 10);

  // IDA - PRIMEIRO BLOCO
  texto(body.transporteIda, 61, 478, 10);
  texto(body.valorIda, 59, 462, 10);
  texto(body.valorIda, 197, 315, 10);

  // VOLTA - PRIMEIRO BLOCO
  texto(body.transporteVolta, 359, 478, 10);
  texto(body.valorVolta, 357, 462, 10);
  texto(body.valorVolta, 488, 315, 10);

  // MARCAR SIM, OPTO PELO VALE TRANSPORTE
  check(26, 260);
  // Data final
texto(body.dia, 90, 62, 14);
texto(body.mes, 132, 62, 14);
texto(body.ano, 178, 62, 14);

  // assinatura e data final ficam em branco

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=vale-transporte.pdf",
    },
  });
}