const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return ["Kurus", "bg-yellow-500"];
    if (bmi < 22.99) return ["Normal", "bg-success"];
    if (bmi < 24.99) return ["Gemuk", "bg-yellow-500"];
    return ["Obesitas", "bg-red-500"];
  };

export { getBMIStatus };