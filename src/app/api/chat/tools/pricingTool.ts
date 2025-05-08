import { tool } from 'ai';
import { z } from 'zod';
import pricingInfo from '../knowledge/pricing_info.json';

export const pricingTool = tool({
  description: 'Memberikan informasi harga, paket, promo, dan subscription NutriPlate',
  parameters: z.object({
    packageName: z.string().optional().describe('Nama paket yang ingin diketahui, misal: Paket NutriPlate Single, Paket NutriPlate Couple, Paket Premium App Only'),
  }),
  async execute({ packageName }: { packageName?: string }) {
    if (!packageName) return { result: pricingInfo.pricing_packages };
    const found = pricingInfo.pricing_packages.find((pkg: any) => pkg.name.toLowerCase().includes(packageName.toLowerCase()));
    return { result: found || 'Paket tidak ditemukan.' };
  },
}); 