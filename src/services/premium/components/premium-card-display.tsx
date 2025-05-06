import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2Icon, XIcon, CheckIcon } from 'lucide-react';
import PremiumCardButtonWrapper from '@/services/premium/components/premium-card-button-wrapper';

interface Feature {
  text: string;
  available: boolean;
}

interface PremiumCardDisplayProps {
  title: string;
  price: string;
  period: string;
  features: Feature[];
  badge: string;
  isMostPopular?: boolean;
  variant?: "default" | "primary" | "neutral" | "yellow" | "mint";
  planId: string;
  isActive?: boolean;
  endDate?: string;
}

const PremiumCardDisplay = ({
  title,
  price,
  period,
  features,
  badge,
  isMostPopular = false,
  variant = "neutral",
  planId,
  isActive = false,
  endDate = ''
}: PremiumCardDisplayProps) => {
  const hasValidSubscription = Boolean(endDate && new Date(endDate) > new Date());
  
  return (
    <Card
      className={`overflow-hidden rounded-xl border-2 ${hasValidSubscription ? 'border-green-500 shadow-md shadow-green-200' : ''} relative`}
      variant={variant}
    >
      {hasValidSubscription && (
        <div className="absolute -right-1 -top-1 bg-green-500 text-white p-1 rounded-bl-lg rounded-tr-lg shadow z-10 flex items-center">
          <CheckIcon size={14} className="mr-1" />
          <span className="text-xs font-semibold pe-4">Aktif</span>
        </div>
      )}
      
      <div className="relative p-5">
        {/* Plan title and price */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            {badge && badge !== "Aktif" && (
              <Badge 
                variant="default"
                className="ml-2 bg-teal-500 text-white"
              >
                {badge}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">{price}</span>
            {period && <span className="text-sm"> {period}</span>}
          </div>
        </div>
        
        {/* Features list */}
        <ul className="space-y-1.5 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.available ? (
                <span className={`mr-2 ${hasValidSubscription ? 'text-green-500' : 'text-teal-500'}`}>
                  <CheckCircle2Icon size={16} />
                </span>
              ) : (
                <span className="mr-2 text-red-500">
                  <XIcon size={16} />
                </span>
              )}
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
        
        {/* Subscribe button - using a client wrapper component */}
        <div className="flex justify-end">
          <PremiumCardButtonWrapper
            planId={planId} 
            isActive={hasValidSubscription} 
          />
        </div>
      </div>
    </Card>
  );
};

export default PremiumCardDisplay;