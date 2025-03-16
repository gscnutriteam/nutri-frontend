import type { AiResult } from "@/services/ai/schema";
import { create } from "zustand";

export enum ScanPhase {
    IDLE = 'IDLE',
    UPLOAD = 'UPLOAD',
    DETECTING = 'DETECTING',
    RESULT = 'RESULT',
    FINISHED = 'FINISHED',
}

// Extended food item with isAdded flag
export interface FoodWithStatus {
    name: string;
    calorie: number;
    protein: number;
    fat: number;
    carbo: number;
    isAdded?: boolean;
}

export interface ScanData {
    scanImageLink: string;
    scanResult: AiResult | null;
    isLoading?: boolean;
    phase?: ScanPhase;
}

interface ScanDataState extends ScanData {
    set: (data: Partial<ScanData>) => void;
    reset: () => void;
    setScanImageLink: (scanImageLink: string) => void;
    setScanResult: (scanResult: AiResult | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    setPhase: (phase: ScanPhase) => void;
    setFoodAdded: (foodName: string, isAdded: boolean) => void;
    isFoodAdded: (foodName: string) => boolean;
}

const scanInitialState: ScanData = {
    scanImageLink: '',
    scanResult: null,
    isLoading: false,
    phase: ScanPhase.IDLE,
}

export const useScanStore = create<ScanDataState>((set, get) => ({
    ...scanInitialState,
    set,
    reset: () => set(scanInitialState),
    setScanImageLink: (scanImageLink: string) => set({ scanImageLink }),
    setScanResult: (scanResult: AiResult | null) => {
        // Add isAdded flag to each food item when setting the result
        if (scanResult) {
            const result = {
                ...scanResult,
                foods: scanResult.foods.map(food => ({
                    ...food,
                    isAdded: false
                }))
            };
            set({ scanResult: result });
        } else {
            set({ scanResult: null });
        }
    },
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setPhase: (phase: ScanPhase) => set({ phase }),
    setFoodAdded: (foodName: string, isAdded: boolean) => {
        const scanResult = get().scanResult;
        if (!scanResult) return;

        const updatedFoods = scanResult.foods.map(food => {
            if (food.name === foodName) {
                return { ...food, isAdded };
            }
            return food;
        });

        set({ 
            scanResult: { 
                ...scanResult, 
                foods: updatedFoods 
            } 
        });
    },
    isFoodAdded: (foodName: string) => {
        const scanResult = get().scanResult;
        if (!scanResult) return false;
        
        const food = scanResult.foods.find(f => f.name === foodName) as FoodWithStatus;
        return food?.isAdded || false;
    }
}));

export default useScanStore;