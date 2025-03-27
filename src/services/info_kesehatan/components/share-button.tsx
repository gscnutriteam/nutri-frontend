"use client";

import { useState } from "react";
import { 
  ShareIcon, 
  Copy, 
  CheckCircle, 
  Link as LinkIcon, 
  Facebook, 
  Twitter, 
  X
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButton({ url, title, className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Generate the absolute URL for sharing
  const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${url}`
    : url;
    
  // Handle share button click
  const toggleShareMenu = () => {
    setIsOpen(!isOpen);
    setCopied(false);
  };
  
  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Link berhasil disalin");
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Gagal menyalin link");
      console.error("Failed to copy: ", err);
    }
  };
  
  // Share to social media
  const shareToSocial = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${fullUrl}`)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    }
  };
  
  return (
    <div className="relative">
      <button 
        onClick={toggleShareMenu}
        className={cn("p-2 rounded-full hover:bg-gray-100 transition-colors", className)}
        aria-label="Bagikan artikel"
      >
        <ShareIcon size={18} className={className || "text-gray-600"} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-100">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-medium">Bagikan artikel</p>
            <p className="text-xs text-gray-500 truncate">{title}</p>
          </div>
          
          <div className="p-3">
            <button 
              onClick={copyToClipboard}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors mb-1"
            >
              {copied ? (
                <>
                  <CheckCircle size={16} className="mr-2 text-green-500" />
                  <span>Link disalin</span>
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-2 text-gray-600" />
                  <span>Salin link</span>
                </>
              )}
            </button>
            
            <button 
              onClick={() => shareToSocial('facebook')}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors mb-1"
            >
              <Facebook size={16} className="mr-2 text-blue-600" />
              <span>Facebook</span>
            </button>
            
            <button 
              onClick={() => shareToSocial('twitter')}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors mb-1"
            >
              <X size={16} className="mr-2 text-gray-800" />
              <span>Twitter</span>
            </button>
            
            <button 
              onClick={() => shareToSocial('whatsapp')}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
            >
              <LinkIcon size={16} className="mr-2 text-green-500" />
              <span>WhatsApp</span>
            </button>
          </div>
          
          <div className="p-2 flex justify-end border-t border-gray-100">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 