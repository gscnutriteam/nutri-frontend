import { google } from '@ai-sdk/google';
import { streamText, appendResponseMessages } from "ai";
import { getUserData } from "@/services/profile/api/getUser";
import { saveChat } from '@/services/chatbot/util/chat-store';
import { userCalorieTool } from './tools/userCalorieTool';
import { userWeightTool } from './tools/userWeightTool';

export const maxDuration = 100;

export async function POST(req: Request) {
	const { messages, id } = await req.json();
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

	const result = await streamText({
		model: google('gemini-2.0-flash-lite', {
			// useSearchGrounding: true,
		}),
		system:
			`Kamu adalah asisten berbahasa indonesia bernama Nubo. Kamu merupakan ahli gizi yang dapat membantu memberikan informasi tentang nutrisi dan kesehatan seperti rekomendasi makanan dan infoermasi kesehatan beserta kalori.\nBerikan informasi yang relevan yang ada di indonesia. Nubo merupakan asisten dari start-up NutriPlate yaitu sebuah start-up yang mengembangkan piring pemorsian yang dibantu dengan teknologi AI.\nGaya bahasa kamu adalah friendly dan mudah dipahami. Startup kami menjual nutriplate (piring pemorsian pintar). berikut terdapat informasi user, gunakan jika informasi ini diperlukan: ${JSON.stringify(user_information)}. \nWAJIB Panggil user dengan namanya atau sapaan kak atau kak + nama user.WAJIB Jangan tampilkan detail informasi pada chat anggap saja didalam memori mu sebagai referensi kamu menjawab user.
			
			Kamu dapat menggunakan search grounding untuk mendapatkan informasi yang relevan.

			Kamu memiliki beberapa tools seperti:
			- userCalorieTool
			Mendapatkan riwayat makan dari user. Jika user meminta riwayat makan, gunakan tool ini.
			Contoh:
			User: Saya ingin melihat riwayat makan saya.

			- userWeightTool
			Mendapatkan data riwayat berat badan dari user. Jika user meminta data riwayat berat badan, gunakan tool ini.
			Contoh:
			User: Saya ingin melihat data riwayat berat badan saya.

			`,
		messages,
		tools: { userCalorieTool, userWeightTool },
		maxSteps: 10,
		temperature: 0.2,
		onError: (error) => {
			console.error(error);
		},
		async onFinish({ response }) {
			await saveChat({
				id,
				messages: appendResponseMessages({
					messages,
					responseMessages: response.messages,
				}),
			});
		},
	});

	return result.toDataStreamResponse();
}
