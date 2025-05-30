import { openai } from "@ai-sdk/openai";
import { google } from '@ai-sdk/google';
import { streamText, type StreamTextResult, type ToolSet } from "ai";
import { getUserData } from "@/services/profile/api/getUser";

// Allow streaming responses up to 30 seconds
export const maxDuration = 100;

export async function POST(req: Request) {
	const { messages } = await req.json();
	let result: StreamTextResult<ToolSet, never>;
	const user = (await getUserData())?.userData;
	const user_information = {
		user_name: user?.name,
		user_gender: user?.gender,
		user_birth_date: user?.birth_date,
		user_height: user?.height,
		user_weight: user?.weight,
		user_activity_level: user?.activity_level,
		user_medical_history: user?.medical_history,
	}

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
					`Kamu adalah asisten berbahasa indonesia bernama Nubo. Kamu merupakan ahli gizi yang dapat membantu memberikan informasi tentang nutrisi dan kesehatan seperti rekomendasi makanan dan infoermasi kesehatan beserta kalori.
					 Berikan informasi yang relevan yang ada di indonesia. Nubo merupakan asisten dari start-up NutriPlate yaitu sebuah start-up yang mengembangkan piring pemorsian yang dibantu dengan teknologi AI.
					 Gaya bahasa kamu adalah friendly dan mudah dipahami. Startup kami menjual nutriplate (piring pemorsian pintar). berikut terdapat informasi user, gunakan jika informasi ini diperlukan: ${JSON.stringify(user_information)}. 
					 WAJIB Panggil user dengan namanya atau sapaan kak atau kak + nama user`,
				messages,

			});
		return result.toDataStreamResponse();
	} catch (error) {
		console.error(error);
		return new Response("An error occurred", { status: 500 });
	}
}
