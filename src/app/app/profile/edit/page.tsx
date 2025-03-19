import type { JWTPayload } from "@/lib/jwt";
import { getBMI } from "@/lib/utils";
import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import Home, { metadataHome } from "@/services/home/pages/home_page";
import { getUserData } from "@/services/profile/api/getUser";
import EditProfile, { metadataEditProfile } from "@/services/profile/pages/edit_profile";
import type { ProfileProps } from "@/services/profile/type/types";
import { JWTUserTOProfileProps } from "@/services/profile/util/util";
export const metadata = metadataEditProfile;

const dummyUser: ProfileProps = {
    id: '1',
    name: 'Murdi',
    age: 25,
    gender: Gender.male,
    height: 170,
    bmi: 7.8,
    medical_history: 'Tidak ada',
    physical_activity: PhsyicalActivity.high,
    profile_picture: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100",
    progress: 20,
    email: "cek@gmail.com",
    birth_date: new Date(),
    weight: 60
}

export default async function Page() {
    const user = await getUserData();
    if (!user) return null;
    console.log(user)
    return <EditProfile {...JWTUserTOProfileProps(user)} />;
}

