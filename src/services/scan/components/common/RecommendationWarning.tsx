import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";

interface RecommendationWarningProps {
  recommendation: string;
  comment?: string;
}

const RecommendationWarning = ({ recommendation, comment }: RecommendationWarningProps) => {
  const [open, setOpen] = useState(false);
  const hasContent = Boolean(recommendation || comment);

  // Open modal on first load if there is content
  useEffect(() => {
    if (hasContent) {
      setOpen(true);
    }
  }, [hasContent]);

  if (!hasContent) return null;

  return (
    <>
      {/* Mascot Button with Red Pulse Dot */}
      <button
        className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full bg-transparent flex items-center justify-center focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Lihat rekomendasi dan komentar"
        type="button"
      >
        <div className="relative">
          <Image
            src="/assets/img/nubo_alert.png"
            alt="Maskot Nubo"
            width={64}
            height={64}
            className="drop-shadow-lg"
          />
          {/* Red Pulse Dot */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          </span>
        </div>
      </button>

      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/assets/img/nubo_alert.png"
                alt="Maskot Nubo"
                width={48}
                height={48}
                className="drop-shadow-lg"
              />
              <DialogTitle className="text-lg font-bold">Rekomendasi & Komentar</DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              {recommendation && (
                <div className="mb-2">
                  <span className="font-semibold">Kometar:</span>
                  <p className="text-base mt-1">{comment}</p>
                </div>
              )}
              {comment && (
                <div>
                  <span className="font-semibold">Rekomendasi:</span>
                  <p className="text-base mt-1">{recommendation}</p>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecommendationWarning; 