import Image from "next/image";

export const ScanLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-4">
                <Image src="/assets/img/nubo-large.png" width={178} height={95} alt="loading" />
            </div>
            <p className="text-xl font-bold">Menganalisis Makanan...</p>
        </div>
    );
}