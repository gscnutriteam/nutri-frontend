

export interface ProfileProps {
    // user: {
      id: string;
      name: string;
      birth_date: Date;
      email: string;
      age?: number;
      height?: number;
      weight?: number;
      bmi?: number;
      gender: string;
      physical_activity: string;
      medical_history: string;
      profile_picture: string;
      progress: number;
      isProductTokenVerified?: boolean;
      subscriptionFeatures?: {
        bmi_check?: boolean;
        scan_ai?: boolean;
        scan_calorie?: boolean;
        health_info?: boolean;
        chatbot?: boolean;
        weight_tracking?: boolean;
        [key: string]: boolean | undefined;
      }
    // };
  }