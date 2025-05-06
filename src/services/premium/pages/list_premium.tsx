import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import PremiumCardDisplay from "@/services/premium/components/premium-card-display";
import PremiumCardSkeleton from "../components/premium-card-skeleton";
import { getAllSubscriptionPlans, getUserSubscription } from "../api/subscriptions";
import CurrentSubscription from "../components/current-subscription";

// Set revalidation time to 5 minutes (300 seconds)
export const revalidate = 300;

// Server component to fetch and show current subscription
async function CurrentSubscriptionServer() {
  const subscription = await getUserSubscription();
  
  if (!subscription || !subscription.is_active) {
    return null;
  }
  
  return <CurrentSubscription subscription={subscription} />;
}

// Server component to fetch subscription plans
async function SubscriptionPlansServer() {
  const plans = await getAllSubscriptionPlans();
  const userSubscription = await getUserSubscription();
  const hasActiveSubscription = userSubscription?.is_active || false;
  const activePlanId = userSubscription?.plan?.id || null;

  // If API returned no plans, provide fallback data
  const fallbackPlans = [
    {
      id: "1",
      name: "Paket Hemat",
      price: 15000,
      price_formatted: "Rp. 15000",
      description: "Paket dasar untuk pemula",
      ai_scan_limit: 10,
      validity_days: 30,
      features: {
        scan_ai: true,
        scan_estimasi_kalori: true,
        cek_bmi: false,
        chatbot_gizi: true,
        bmi_check: false,
        tracking_berat_badan: false,
        informasi_kesehatan: false,
      },
      is_recommended: false
    },
    {
      id: "2",
      name: "Paket Sehat",
      price: 30000,
      price_formatted: "Rp. 30000",
      description: "Paket terbaik untuk kesehatan",
      ai_scan_limit: 10,
      validity_days: 90,
      features: {
        scan_ai: true,
        scan_estimasi_kalori: true,
        bmi_check: true,
        chatbot: true,
        weight_tracking: false,
        health_info: false,
      },
      is_recommended: true
    },
    {
      id: "3",
      name: "Paket Sultan",
      price: 120000,
      price_formatted: "Rp. 120000",
      description: "Paket lengkap untuk hasil maksimal",
      ai_scan_limit: 30,
      validity_days: 365,
      features: {
        scan_ai: true,
        scan_estimasi_kalori: true,
        bmi_check: true,
        chatbot: true,
        cek_bmi: true,
        weight_tracking: true,
        health_info: true,
      },
      is_recommended: false
    }
  ];

  const subscriptionPlans = plans.length > 0 ? plans : fallbackPlans;
  
  // Format the feature data to match our component's expected structure
  const formattedPlans = await Promise.all(subscriptionPlans.map(async (plan, index) => {
    // Check if this plan is currently active
    const isActive = hasActiveSubscription && plan.id === activePlanId;
    // Get the end date if this plan is active
    const endDate = (isActive && userSubscription) ? userSubscription.end_date : '';
    
    // Create feature items with proper typing
    const featureItems = [
      { text: `${plan.ai_scan_limit}x scan AI`, available: true },
      { text: "scan estimasi kalori", available: Boolean(plan.features.scan_estimasi_kalori || plan.features.scan_ai) },
      { text: "chatBot gizi", available: Boolean(plan.features.chatbot) },
      { text: "cek BMI", available: Boolean(plan.features.bmi_check) },
      { text: "tracking pemantauan berat badan", available: Boolean(plan.features.weight_tracking) },
      { text: "informasi kesehatan", available: Boolean(plan.features.health_info) },
    ];

    // Determine card variant - second card (index 1) always gets mint variant
    let cardVariant: "yellow" | "mint" = "yellow";
    if (index === 1) {
      cardVariant = "mint";
    }

    return {
      id: plan.id,
      title: plan.name,
      price: plan.price_formatted,
      period: "",
      features: featureItems,
      badge: isActive ? "Aktif" : (plan.is_recommended ? "Best Seller" : ""),
      isMostPopular: plan.is_recommended,
      variant: cardVariant,
      planId: plan.id,
      isActive,
      endDate
    };
  }));

  return (
    <div className="space-y-4">
      {formattedPlans.map(plan => (
        <PremiumCardDisplay
          key={plan.id}
          title={plan.title}
          price={plan.price}
          period={plan.period}
          features={plan.features}
          badge={plan.badge}
          isMostPopular={plan.isMostPopular}
          variant={plan.variant}
          planId={plan.planId}
          isActive={plan.isActive}
          endDate={plan.endDate}
        />
      ))}
    </div>
  );
}

export default function ListPremium() {
  return (
    <AppMobileLayout>
      <div className="bg-white h-screen flex flex-col w-full overflow-auto pb-10">
        <div className="p-4 flex items-center">
          <Link href="/app" className="text-teal-500">
            <ArrowLeftIcon size={24} />
          </Link>
          <h1 className="text-teal-500 text-xl font-medium mx-auto pr-6">Try Pro</h1>
        </div>
        
        <div className="px-4 pb-20">
          <p className="text-center text-teal-500 mb-6">
            Dapatkan pengalaman terbaik dalam mengontrol kesehatan Anda dengan NutriBox
          </p>
          
          {/* Show current subscription if exists */}
          <Suspense fallback={<div className="h-10 bg-gray-100 rounded-lg mb-6 animate-pulse"></div>}>
            <CurrentSubscriptionServer />
          </Suspense>
          
          <h3 className="font-semibold text-lg mb-4">Pilih Paket Premium</h3>
          
          <Suspense fallback={
            <>
              <PremiumCardSkeleton />
              <PremiumCardSkeleton />
              <PremiumCardSkeleton />
            </>
          }>
            <SubscriptionPlansServer />
          </Suspense>
        </div>
      </div>
    </AppMobileLayout>
  );
}

export const metadataListPremium: Metadata = {
  title: "Premium Plan | NutriBox",
  description: "Premium Plan page nutribox app",
  icons: "/assets/img/logo.png",
  openGraph: {
    title: "Premium Plan | NutriBox",
    description: "Premium Plan nutribox app",
  },
}; 