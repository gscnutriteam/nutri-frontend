"use client";
import Image from "next/image";
import useScanStore, { ScanPhase } from "../store/scan_store";
import { useEffect } from "react";

export const ScanLoading = () => {
    const { phase } = useScanStore();
    
    // Function to get the appropriate message based on scan phase
    const getPhaseMessage = () => {
        switch (phase) {
            case ScanPhase.UPLOAD:
                return "Mengupload gambar...";
            case ScanPhase.DETECTING:
                return "Menganalisis makanan...";
            case ScanPhase.RESULT:
                return "Menyiapkan hasil...";
            default:
                return "Memproses...";
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className="mb-4 animate-bounce">
                <Image 
                    src="/assets/img/nubo-large.png" 
                    width={178} 
                    height={95} 
                    alt="loading" 
                    className="transition-all duration-500"
                />
            </div>
            <p className="text-xl font-bold text-center transition-all duration-300">
                {getPhaseMessage()}
            </p>
        </div>
    );
}