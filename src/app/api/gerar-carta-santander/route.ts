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
    "carta-santander.pdf"
  );

  const existingPdfBytes = fs.readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  const page = pdfDoc.getPages()[0];

  function texto(
    valor: string,
    x: number,
    y: number,
    size = 8
  ) {
    page.drawText(valor || "", {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  }

 // TOPO
texto(
  `${body.cidadeCarta}, ${body.dataExtenso}`,
  55,
  710,
  8
);

// NOME
texto(
  body.nome,
  170,
  348,
  8
);

// CPF
texto(
  body.cpf,
  460,
  348,
  8
);

// RUA
texto(
  body.rua,
  190,
  335,
  8
);

// NÚMERO
texto(
  body.numero,
  295,
  335,
  8
);

// CIDADE
texto(
  body.cidade,
  362,
  335,
  8
);

// CEP
texto(
  body.cep,
  470,
  335,
  8
);


// DATA ADMISSÃO
texto(
  body.diaAdmissao,
  170,
  322,
  7
);

texto(
  body.mesAdmissao,
  190,
  322,
  7
);

texto(
  body.anoAdmissao,
  206,
  322,
  7
);

// CARGO
texto(
  body.cargo,
  340,
  322,
  8
);

// SALÁRIO
texto(
  body.salario,
  120,
  310,
  8
);
  const pdfBytes = await pdfDoc.save();

  return new NextResponse(
    Buffer.from(pdfBytes),
    {
      headers: {
        "Content-Type":
          "application/pdf",

        "Content-Disposition":
          "attachment; filename=carta-santander.pdf",
      },
    }
  );
}