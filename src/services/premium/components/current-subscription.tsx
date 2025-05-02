import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CheckCircle2Icon } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { id } from 'date-fns/locale';
import { type UserSubscription } from '../api/subscriptions';

interface CurrentSubscriptionProps {
  subscription: UserSubscription;
}

const CurrentSubscription: React.FC<CurrentSubscriptionProps> = ({ subscription }) => {
  const endDate = new Date(subscription.end_date);
  const now = new Date();
  
  // Calculate days remaining
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format the expiration date
  const formattedTimeRemaining = formatDistance(endDate, now, {
    addSuffix: false,
    locale: id
  });

  // Check if subscription is active but expiring soon (less than 7 days)
  const isExpiringSoon = subscription.is_active && daysRemaining <= 7 && daysRemaining > 0;
  
  return (
    <Card className="overflow-hidden rounded-xl border-2 mb-6" variant="neutral">
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">{subscription.plan.name}</h3>
            {subscription.is_active ? (
              <Badge variant="default" className="ml-2 bg-green-500 text-white">
                Paket Anda
              </Badge>
            ) : (
              <Badge variant="default" className="ml-2 bg-red-500 text-white">
                Expired
              </Badge>
            )}
          </div>
          <div className="text-right">
            <span className="text-md font-medium">{subscription.plan.price_formatted}</span>
          </div>
        </div>
        
        <div className="mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600 mb-1">
            <CalendarIcon size={14} />
            {subscription.is_active ? (
              <span>
                Berakhir dalam{" "}
                <span className={isExpiringSoon ? "text-red-500 font-medium" : "text-gray-700"}>
                  {formattedTimeRemaining}
                </span>
              </span>
            ) : (
              <span className="text-red-500">Langganan sudah berakhir</span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-gray-600">
            <CheckCircle2Icon size={14} />
            <span>
              Sisa scan: {subscription.plan.ai_scan_limit - subscription.ai_scans_used} dari {subscription.plan.ai_scan_limit}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentSubscription; 