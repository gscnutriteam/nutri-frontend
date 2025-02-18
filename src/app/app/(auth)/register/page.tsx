import RegisterUser, { metadataRegisterUser } from "@/services/auth/pages/register_user";

export const metadata = metadataRegisterUser;
export default function Page() {
    return (
        <RegisterUser />
    )
}