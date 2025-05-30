"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AppMobileLayout from '@/layout/app_mobile_layout';
import {
  CreditCard, HelpCircle, Info, Share2, ThumbsUp, User, Edit3, Mail, LogOut,
  KeyRound, Award, Bell, ShieldCheck, MessageSquarePlus, FileText,
  MailCheck, MailWarning
} from 'lucide-react';
import Head from 'next/head';
import { Gender } from '@/services/auth/store/register_store';
import { Button } from '@/components/ui/button';
import { ButtonLogout } from '../components/button_logout';
import { toast, Toaster } from 'sonner';
import type { ProfileProps } from '../type/types';
import { HeaderFeature } from '@/components/ui/header_feature';
import { sendEmailVerification } from '../api/sendEmailVerification';
import { sendResetPassword } from '../api/sendResetPassword';
import LinkAPP from '@/components/util/link';

export default function Profile(user: ProfileProps) {
  return (
    <>
      <Head>
        <title>Profile | NutriPlate</title>
      </Head>
      <AppMobileLayout>
        <Toaster position="top-center" richColors />
        <HeaderFeature 
            title="Profile"
            variant={"primary"} 
            className="text-center w-full py-3 sticky top-0 z-20 bg-white border-b-2 border-black"
        />
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto pb-20 pt-6 px-4">
            {/* User Info Section */}
            <div className="flex items-center mb-8 p-4 bg-secondaryLight rounded-base border-2 border-black shadow-neobrutalism">
              <img
                src={user.profile_picture || "/assets/img/no_pp.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-black mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-black">{user.name}</h2>
                <div className="flex items-center">
                  <Mail size={14} className="mr-1 text-gray-700" /> 
                  <p className="text-sm text-gray-700">{user.email}</p>
                  {user.verified_email ? (
                    <MailCheck size={16} className="ml-2 text-green-500" />
                  ) : (
                    <MailWarning size={16} className="ml-2 text-yellow-500" />
                  )}
                </div>
                 <p className="text-sm text-gray-600">
                  {user.gender === Gender.male ? "Laki-Laki" : "Perempuan"} | {user.age} tahun
                </p>
              </div>
              <Button 
                variant="default"
                size="icon"
                className="bg-secondary text-black shadow-neobrutalism-sm hover:shadow-none border-2 border-black"
                onClick={() => window.location.href = "profile/edit"}
              >
                <Edit3 size={18} />
              </Button>
            </div>

            {/* Menu Sections */}
            <div className="space-y-6">

              {/* Akun Section */}
              <div>
                <h3 className="font-bold text-md px-2 mb-2 text-gray-700">Akun</h3>
                <Card variant="neutral" className="shadow-neobrutalism border-2 border-black">
                  <CardContent className="p-0">
                    <div className="divide-y-2 divide-border">
                      {user.verified_email ? (
                        <MenuButton 
                          icon={<MailCheck className="stroke-green-500" />} 
                          label="Email Terverifikasi" 
                          href="#"
                          disabled
                        />
                      ) : (
                        <MenuButton 
                          icon={<MailWarning className="stroke-yellow-500" />} 
                          label="Verifikasi Email Anda" 
                          onClick={ async () => {
                            toast.promise(sendEmailVerification(), {
                              loading: "Mengirim email verifikasi...",
                              success: "Email verifikasi berhasil dikirim",
                              error: "Gagal mengirim email verifikasi"
                            });
                          }}
                        />
                      )}
                      {/* <MenuButton 
                        icon={<CreditCard className="stroke-primaryText" />} 
                        label="Kelola Pembayaran" 
                        href="/billing" 
                      /> */}
                      <MenuButton 
                        icon={<KeyRound className="stroke-primaryText" />} 
                        label="Ubah Kata Sandi" 
                        onClick={() => {
                          toast.promise(sendResetPassword(user.email), {
                            loading: "Mengirim email reset password...",
                            success: "Email reset password berhasil dikirim",
                            error: "Gagal mengirim email reset password"
                          });
                        }}
                      />
                      <MenuButton 
                        icon={<Award className="stroke-primaryText" />} 
                        label="Detail Langganan" 
                        href="/premium" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pengaturan Section */}
              <div>
                <h3 className="font-bold text-md px-2 mb-2 text-gray-700">Pengaturan</h3>
                <Card variant="neutral" className="shadow-neobrutalism border-2 border-black">
                  <CardContent className="p-0">
                    <div className="divide-y-2 divide-border">
                      <MenuButton 
                        icon={<Bell className="stroke-primaryText" />} 
                        label="Notifikasi (Soon)" 
                        href="/settings/notifications" 
                        disabled
                      />
                      <MenuButton 
                        icon={<ShieldCheck className="stroke-primaryText" />} 
                        label="Privasi Akun (Soon)" 
                        href="/settings/privacy" 
                        disabled
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bantuan & Masukan Section */}
              <div>
                <h3 className="font-bold text-md px-2 mb-2 text-gray-700">Bantuan & Masukan</h3>
                <Card variant="neutral" className="shadow-neobrutalism border-2 border-black">
                  <CardContent className="p-0">
                    <div className="divide-y-2 divide-border">
                      <MenuButton 
                        icon={<HelpCircle className="stroke-primaryText" />} 
                        label="Pusat Bantuan" 
                        href="https://api.whatsapp.com/send/?phone=6285717035472&text&type=phone_number&app_absent=0" 
                      />
                       <MenuButton 
                        icon={<MessageSquarePlus className="stroke-primaryText" />} 
                        label="Kirim Masukan" 
                        href="/feedback" 
                      />
                      <MenuButton 
                        icon={<ThumbsUp className="stroke-primaryText" />} 
                        label="Nilai Kami" 
                        href="/rate" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Aplikasi Section */}
              <div>
                <h3 className="font-bold text-md px-2 mb-2 text-gray-700">Aplikasi</h3>
                <Card variant="neutral" className="shadow-neobrutalism border-2 border-black">
                  <CardContent className="p-0">
                    <div className="divide-y-2 divide-border">
                      <MenuButton 
                        icon={<Info className="stroke-primaryText" />} 
                        label="Tentang Kami" 
                        href="/about" 
                      />
                      <MenuButton 
                        icon={<Share2 className="stroke-primaryText" />} 
                        label="Bagikan Aplikasi" 
                        onClick={() => {
                          navigator.share({
                            title: 'NutriPlate',
                            text: 'Bagikan Aplikasi NutriPlate',
                            url: 'https://nutriplate.id'
                          });
                        }}
                      />
                      <MenuButton 
                        icon={<FileText className="stroke-primaryText" />} 
                        label="Ketentuan Layanan" 
                        href="/legal/terms" 
                      />
                       <MenuButton 
                        icon={<FileText className="stroke-primaryText" />}
                        label="Kebijakan Privasi" 
                        href="/legal/privacy-policy" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 pt-4 border-t-2 border-gray-200">
                <ButtonLogout />
              </div>
            </div>
          </div>
        </div>
      </AppMobileLayout>
    </>
  );
}

// Menu Button Component
const MenuButton = ({ icon, label, href, disabled, onClick }: { icon: React.ReactNode, label: string, href?: string, disabled?: boolean, onClick?: () => void }) => {
  const content = (
    <>
      {icon}
      <span className={`font-medium cursor-pointer text-black ${disabled ? 'text-gray-500' : ''}`}>{label}</span>
      {!disabled && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-auto text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </>
  );

  if (disabled) {
    return (
      <div className="flex items-center gap-4 p-4 opacity-50 cursor-not-allowed">
        {content}
      </div>
    );
  }

  return (
    <LinkAPP 
      href={href ? href : '#'} 
      className="flex items-center gap-4 p-4 hover:bg-primaryLight transition-colors duration-150 ease-in-out"
      onClick={onClick}
    >
      {content}
    </LinkAPP>
  );
};
