export interface CardBeratProps {
    tinggi: number;
    berat: number;
    bmi: number;
    tanggal: Date;
    id: string;
}

export interface ModalEditBeratProps {
    tinggi: number;
    berat: number;
    id: string;
    tanggal: Date;
}

export interface CardCalorieProps {
    tanggal: Date;
    calorie: number;
    id: string;
    carbs: number;
    protein: number;
    fat: number;
    title: string;
    image: string;
}