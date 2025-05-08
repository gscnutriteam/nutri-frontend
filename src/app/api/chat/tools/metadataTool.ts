import { tool } from 'ai';
import { z } from 'zod';
import metadataInfo from '../knowledge/metadata_info.json';

export const metadataTool = tool({
  description: 'Memberikan informasi metadata untuk intent, tipe respons, tone, dan definisi entitas chatbot NutriPlate',
  parameters: z.object({
    type: z.string().optional().describe('Jenis metadata yang ingin diketahui, misal: intents, response_types, tone_guidelines, entity_definitions'),
  }),
  async execute({ type }: { type?: string }) {
    if (!type) return metadataInfo;
    if ((type as keyof typeof metadataInfo) in metadataInfo) return { result: metadataInfo[type as keyof typeof metadataInfo] };
    return { result: 'Metadata tidak ditemukan.' };
  },
}); 