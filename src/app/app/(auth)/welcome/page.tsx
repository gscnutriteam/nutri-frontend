import Welcome from "@/services/auth/pages/welcome";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome | NutriBox',
  description: 'Welcome page nutribox app',
  icons: "/assets/img/logo.png",
  openGraph: {
    title: 'Welcome | NutriBox',
    description: 'Welcome page nutribox app',
    // images: ['/og-image.jpg']
  }
}
export default function Page() {
    return (
        <Welcome />
    )
}