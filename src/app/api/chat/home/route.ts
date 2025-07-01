import { google } from '@ai-sdk/google';
import { streamText } from "ai";
import { faqTool } from '../tools/faqTool';
import { productInfoTool } from '../tools/productInfoTool';
import { pricingTool } from '../tools/pricingTool';
import { platformFeaturesTool } from '../tools/platformFeaturesTool';
import { companyInfoTool } from '../tools/companyInfoTool';
import { chatFlowTool } from '../tools/chatFlowTool';
import { metadataTool } from '../tools/metadataTool';

// Allow streaming responses up to 30 seconds
export const maxDuration = 100;

export async function POST(req: Request) {
	const { messages } = await req.json();
	try {
		const result = await streamText({
				model: google('gemini-2.0-flash-lite'),
				system:
					"Kamu adalah chatbot bernama Nubo sales ramah untuk produk NutriCare. Selalu gunakan sapaan 'kak' atau 'kakak' dalam setiap interaksi. Jawabanmu harus membantu, persuasif, dan bertujuan untuk closing penjualan. Jika user tertarik atau ingin membeli, arahkan dengan ramah ke link Tokopedia (https://tokopedia.link/hnQeydRQ5Kb) atau Shopee (http://shopee.co.id/NutriCareugm) yang ada di kontak perusahaan. Gunakan knowledge dari tools yang tersedia untuk menjawab pertanyaan seputar produk, harga, fitur, perusahaan, dan FAQ. Jika pertanyaan di luar topik, arahkan kembali ke produk dengan ramah. PENTING: Ketika perlu menggunakan tool untuk mendapatkan informasi, LANGSUNG gunakan tool tersebut dan LANGSUNG berikan jawaban lengkap dengan datanya. JANGAN berhenti setelah memanggil tool. SELALU SELESAIKAN JAWABAN PENUH dalam satu respons tanpa menunggu input lagi dari user.",
				messages,
				maxSteps: 10,
				
				tools: { faqTool, productInfoTool, pricingTool, platformFeaturesTool, companyInfoTool, chatFlowTool, metadataTool },
				temperature: 0.2, // Temperatur rendah agar lebih deterministik
				// maxTokens: 2048, // Pastikan cukup token untuk jawaban lengkap
			});
		return result.toDataStreamResponse();
	} catch (error) {
		console.error(error);
		return new Response("An error occurred", { status: 500 });
	}
}
