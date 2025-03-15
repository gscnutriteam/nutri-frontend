import RegisterToken, { metadataToken } from "@/services/auth/pages/register_token";

export const metadata = metadataToken;
export default function Page() {
    return (
        <RegisterToken />
    )
}