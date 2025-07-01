import { tool } from 'ai';
import { z } from 'zod';
import companyInfo from '../knowledge/company_info.json';

export const companyInfoTool = tool({
  description: 'Memberikan informasi tentang perusahaan NutriCare (visi, misi, kontak, partner, tujuan bisnis, dsb)',
  parameters: z.object({
    detail: z.string().optional().describe('Bagian detail perusahaan yang ingin diketahui, misal: vision, mission, contact, partners, business_goals, tagline, about'),
  }),
  async execute({ detail }: { detail?: string }) {
    if (!detail) return companyInfo;
    if ((detail as keyof typeof companyInfo) in companyInfo) return { result: companyInfo[detail as keyof typeof companyInfo] };
    return { result: 'Detail perusahaan tidak ditemukan.' };
  },
}); 