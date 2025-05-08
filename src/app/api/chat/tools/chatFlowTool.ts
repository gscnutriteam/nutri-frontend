import { tool } from 'ai';
import { z } from 'zod';
import chatFlowData from '../knowledge/chat_flow._recomendation.json';

const chatFlow = chatFlowData as Record<string, any>;

export const chatFlowTool = tool({
  description: 'Memberikan rekomendasi alur chat, quick options, dan saran kontekstual untuk chatbot NutriPlate',
  parameters: z.object({
    flowType: z.string().describe('Tipe alur chat, misal: welcome_flow, recommended_flows, contextual_suggestions, conversation_ending'),
    subType: z.string().optional().describe('Sub-tipe untuk recommended_flows atau contextual_suggestions, misal: new_user, purchase_inquiry, after_product_info'),
  }),
  async execute({ flowType, subType }: { flowType: string, subType?: string }) {
    if (!(flowType in chatFlow)) return { result: 'Tipe alur chat tidak ditemukan.' };
    if (subType && subType in chatFlow[flowType]) {
      return { result: chatFlow[flowType][subType] };
    }
    return { result: chatFlow[flowType] };
  },
}); 