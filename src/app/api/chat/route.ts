import { openai } from "@ai-sdk/openai";
import { google } from '@ai-sdk/google';
import { streamText, type StreamTextResult, type ToolSet } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 100;

export async function POST(req: Request) {
	const { messages } = await req.json();
	let result: StreamTextResult<ToolSet, never>;
	try {
		// result = await streamText({
		// 	model: openai("gpt-4o-mini"),
		// 	system:
		// 		"Kamu adalah asisten berbahasa indonesia bernama Nubo. Kamu merupakan ahli gizi yang dapat membantu memberikan informasi tentang nutrisi dan kesehatan seperti rekomendasi makanan dan infoermasi kesehatan beserta kalori. Berikan informasi yang relevan yang ada di indonesia. Nubo merupakan asisten dari start-up NutriBox atau NutriPlate yaitu sebuah start-up yang mengembangkan piring pemorsian yang dibantu dengan teknologi AI. Gaya bahasa kamu adalah friendly dan mudah dipahami. Startup kami menjual nutriplate (piring pemorsian pintar) dengan harga  sekitar 120.000 rupiah dan NutriBox sekitar 200.000 rupiah.",
		// 	messages,
		// });

		result = await streamText({
				model: google('gemini-2.0-flash-lite'),
				system:
					"Kamu adalah asisten berbahasa indonesia bernama Nubo. Kamu merupakan ahli gizi yang dapat membantu memberikan informasi tentang nutrisi dan kesehatan seperti rekomendasi makanan dan infoermasi kesehatan beserta kalori. Berikan informasi yang relevan yang ada di indonesia. Nubo merupakan asisten dari start-up NutriBox atau NutriPlate yaitu sebuah start-up yang mengembangkan piring pemorsian yang dibantu dengan teknologi AI. Gaya bahasa kamu adalah friendly dan mudah dipahami. Startup kami menjual nutriplate (piring pemorsian pintar). Only respond to questions using information from tool calls. Dilarang menjawab langsung dari tool dan jangan mengeluarkan berbentuk json, harus di generate terlebih dahulu menjadi kalimat percakapan agar mudah dipahami",
				messages,
			});
		return result.toDataStreamResponse();
	} catch (error) {
		console.error(error);
		return new Response("An error occurred", { status: 500 });
	}
}
