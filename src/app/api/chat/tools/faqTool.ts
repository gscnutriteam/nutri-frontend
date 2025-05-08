import { z } from 'zod';
import faqData from '../knowledge/faq_info.json';

export const faqTool = {
  name: 'faqTool',
  description: 'Menjawab pertanyaan seputar FAQ NutriPlate (produk, fitur, pembelian, penggunaan, dukungan)',
  parameters: z.object({
    question: z.string().describe('Pertanyaan yang ingin dijawab dari FAQ'),
  }),
  async execute({ question }: { question: string }) {
    // Gabungkan semua FAQ menjadi satu array
    const allFaqs = [
      ...faqData.product_faqs,
      ...faqData.feature_faqs,
      ...faqData.purchase_faqs,
      ...faqData.usage_faqs,
      ...faqData.support_faqs,
    ];
    // Cari jawaban yang paling relevan (pencocokan sederhana, bisa diimprove dengan fuzzy search)
    const found = allFaqs.find(faq => question.toLowerCase().includes(faq.question.toLowerCase().split(' ')[0]));
    return found ? found.answer : 'Maaf, saya tidak menemukan jawaban untuk pertanyaan tersebut di FAQ.';
  },
}; 