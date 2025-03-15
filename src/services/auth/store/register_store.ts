import { create } from "zustand";

export enum Gender {
    male = 'Male',
    female = 'Female',
}

export enum PhsyicalActivity {
    low = 'Light',
    moderate = 'Medium',
    high = 'Heavy',
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    birth: Date | null;
    gender: Gender | null;
    height: number | null;
    weight: number | null;
    physicalActivity: PhsyicalActivity | null;
    medicalHistory: string;
}

interface RegisterDataState extends RegisterData {
    set: (data: Partial<RegisterData>) => void;
    reset: () => void;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setBirth: (birth: Date) => void;
    setGender: (gender: Gender) => void;
    setHeight: (height: number) => void;
    setWeight: (weight: number) => void;
    setPhysicalActivity: (physicalActivity: PhsyicalActivity) => void;
    setMedicalHistory: (medicalHistory: string) => void;
}

const registerInitialState: RegisterData = {
    name: '',
    email: '',
    password: '',
    birth: null,
    gender: null,
    height: null,
    weight: null,
    physicalActivity: null,
    medicalHistory: '',
}

export const useRegisterStore = create<RegisterDataState>((set) => ({
    ...registerInitialState,
    set,
    reset: () => set(registerInitialState),
    setName: (name: string) => set({ name }),
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setBirth: (birth: Date) => set({ birth }),
    setGender: (gender: Gender) => set({gender}),
    setHeight: (height: number) => set({ height }),
    setWeight: (weight: number) => set({ weight }),
    setPhysicalActivity: (physicalActivity: PhsyicalActivity) => set({ physicalActivity }),
    setMedicalHistory: (medicalHistory: string) => set({ medicalHistory }),
}));