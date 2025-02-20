import Login, { metadataLoginUser } from "@/services/auth/pages/login";

export const metadata = metadataLoginUser;
export default function Page() {
    return (
        <Login />
    )
}