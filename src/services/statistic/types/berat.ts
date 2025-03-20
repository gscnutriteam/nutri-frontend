export interface CardBeratProps {
    tinggi: number;
    berat: number;
    bmi: number;
    tanggal: Date;
    id: number;
}

export interface ModalEditBeratProps {
    tinggi: number;
    berat: number;
    id: number;
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