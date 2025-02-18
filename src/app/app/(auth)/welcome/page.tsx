import Welcome, { metadataWelcome } from "@/services/auth/pages/welcome";
export const metadata = metadataWelcome;

export default function Page() {
    return (
        <Welcome />
    )
}