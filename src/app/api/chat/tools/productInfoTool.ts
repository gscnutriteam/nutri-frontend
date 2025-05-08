import { tool } from 'ai';
import { z } from 'zod';
import productInfo from '../knowledge/product_info.json';

export const productInfoTool = tool({
  description: 'Memberikan informasi detail tentang produk NutriPlate (deskripsi, fitur, varian, bahan, isi paket, instruksi penggunaan)',
  parameters: z.object({
    detail: z.string().optional().describe('Bagian detail produk yang ingin diketahui, misal: variants, usage_instructions, key_features, materials, package_contents'),
  }),
  async execute({ detail }: { detail?: string }) {
    if (!detail) return productInfo;
    if ((detail as keyof typeof productInfo) in productInfo) return { result: productInfo[detail as keyof typeof productInfo] };
    return { result: 'Detail produk tidak ditemukan.' };
  },
}); 