import { openai } from '@/lib/openai'
import { generateText, Output } from 'ai'
import { z } from 'zod'

const suggestionsSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string().describe('Nome do projeto sugerido'),
      description: z.string().describe('Descricao curta do que pode ser feito'),
      difficulty: z.string().describe('Nivel de dificuldade: Facil, Medio ou Avancado'),
      estimatedFabric: z.string().describe('Quantidade estimada de tecido em kg'),
      imagePrompt: z.string().describe('Prompt em ingles para gerar uma imagem do projeto finalizado, descrevendo o produto artesanal de forma detalhada e realista'),
    })
  ),
})

export async function POST(req: Request) {
  const { fabricName, fabricDescription, fabricComposition, fabricColors } = await req.json()

  const { output } = await generateText({
    model: openai('gpt-4o-mini'),
    output: Output.object({ schema: suggestionsSchema }),
    prompt: `Voce e um consultor criativo especializado em artesanato, costura e upcycling de tecidos reciclados.

O cliente tem o seguinte tecido reciclado:
- Nome: ${fabricName}
- Descricao: ${fabricDescription}
- Composição: ${fabricComposition}
- Cores disponiveis: ${fabricColors}

Sugira 4 projetos criativos e praticos que podem ser feitos com esse tecido. Considere projetos para artesaos, costureiras e pequenos negócios. Inclua projetos de diferentes niveis de dificuldade.

Para o campo imagePrompt, escreva em ingles um prompt detalhado para gerar uma imagem realista do produto finalizado, como se fosse uma foto de produto para e-commerce, com fundo clean e boa iluminacao.`,
  })

  return Response.json({ suggestions: output?.suggestions ?? [] })
}
