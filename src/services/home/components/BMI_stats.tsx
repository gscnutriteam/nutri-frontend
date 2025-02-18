import React from 'react';
import { Card } from '@/components/ui/card';

interface BMIStatsProps {
  bmi: number;
  weight: number;
  height: number;
  healthScore: number;
}

const BMIStats: React.FC<BMIStatsProps> = ({ bmi, weight, height, healthScore }) => {
  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return ['Kurus', 'text-yellow-500'];
    if (bmi < 25) return ['Normal', 'text-green-500'];
    if (bmi < 30) return ['Gemuk', 'text-yellow-500'];
    return ['Obesitas', 'text-red-500'];
  };

  const [status, statusColor] = getBMIStatus(bmi);

  return (
    <div className="px-4 mb-4">
      <Card className="p-4 border-2 border-black">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-2xl font-bold mb-1">{bmi.toFixed(1)}</div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${statusColor} bg-opacity-20`}>
                {status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-1">
              Berat: {weight} kg
            </div>
            <div>
              Tinggi: {height} cm
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm mb-1">Poin Hidup Sehat</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-yellow-400 h-2.5 rounded-full" 
              style={{ width: `${(healthScore / 100) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-sm">
            <span>{healthScore}</span>
            <span>⭐</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BMIStats;
