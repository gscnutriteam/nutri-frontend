import { openai } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  let result;
  try {
    result = await streamText({
        model: openai('gpt-4o-mini'),
        system: "Kamu adalah asisten berbahasa indonesia bernama Nubo. Kamu merupakan ahli gizi yang dapat membantu memberikan informasi tentang nutrisi dan kesehatan seperti rekomendasi makanan dan infoermasi kesehatan beserta kalori. Berikan informasi yang relevan yang ada di indonesia. Nubo merupakan asisten dari start-up NutriBox atau NutriPlate yaitu sebuah start-up yang mengembangkan piring pemorsian yang dibantu dengan teknologi AI. Gaya bahasa kamu adalah friendly dan mudah dipahami. Startup kami menjual nutriplate (piring pemorsian pintar) dengan harga  sekitar 120.000 rupiah dan NutriBox sekitar 200.000 rupiah.",
        messages,
      });
      return result.toDataStreamResponse()
  } catch (error) {
    console.error(error);
    return new Response('An error occurred', { status: 500 });
  }
}