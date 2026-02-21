import { NextResponse } from "next/server";
import OpenAI from "openai";
import { toFile } from "openai/uploads";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fabricImage = formData.get("fabricImage");
    const productPrompt = String(formData.get("productPrompt") || "").trim();

    if (!(fabricImage instanceof File)) {
      return NextResponse.json(
        { error: "Arquivo do tecido é obrigatório." },
        { status: 400 }
      );
    }

    if (!productPrompt) {
      return NextResponse.json(
        { error: "Prompt do produto é obrigatório." },
        { status: 400 }
      );
    }

    // Validação básica
    if (!fabricImage.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "O arquivo enviado não é uma imagem." },
        { status: 400 }
      );
    }

    // Converte File -> Buffer
    const arrayBuffer = await fabricImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Converte para arquivo compatível com a API da OpenAI
    const imageFile = await toFile(buffer, fabricImage.name || "fabric.jpg", {
      type: fabricImage.type,
    });

    // Geração com referência visual (tecido)
    const result = await client.images.edit({
      model: "gpt-image-1",
      image: [imageFile],
      prompt: `
Create a photorealistic handmade product based on the provided fabric image.

Product to generate: ${productPrompt}

Requirements:
- Use the uploaded fabric as the main material reference.
- Preserve and reflect the fabric's real texture, color palette, pattern, and visual characteristics.
- The final object must clearly look made from this exact fabric.
- Product photography style, clean background, soft natural light, e-commerce style.
- Highly detailed stitching and realistic textile finish.
      `.trim(),
      size: "1024x1024",
    });

    // gpt-image-1 retorna base64
    const b64 = result.data?.[0]?.b64_json;

    if (!b64) {
      return NextResponse.json(
        { error: "Falha ao gerar imagem." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${b64}`,
    });
  } catch (error) {
    console.error("Erro na geração:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar imagem." },
      { status: 500 }
    );
  }
}