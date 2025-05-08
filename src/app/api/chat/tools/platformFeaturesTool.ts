import { tool } from 'ai';
import { z } from 'zod';
import platformFeatures from '../knowledge/digital_platform_features.json';

export const platformFeaturesTool = tool({
  description: 'Memberikan informasi tentang fitur-fitur platform digital NutriPlate (food scanning, nutrition tracking, AI assistant, resep, info kesehatan, layanan tambahan)',
  parameters: z.object({
    featureName: z.string().optional().describe('Nama fitur yang ingin diketahui, misal: food_scanning, nutrition_tracking, ai_assistant, recipes, health_info, additional_services'),
  }),
  async execute({ featureName }: { featureName?: string }) {
    if (!featureName) return { result: platformFeatures.features };
    if (platformFeatures.features[featureName as keyof typeof platformFeatures.features]) {
      return { result: platformFeatures.features[featureName as keyof typeof platformFeatures.features] };
    }
    return { result: 'Fitur tidak ditemukan.' };
  },
}); 