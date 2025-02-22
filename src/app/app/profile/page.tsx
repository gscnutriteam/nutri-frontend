import { Gender, PhsyicalActivity } from "@/services/auth/store/register_store";
import Home, { metadataHome } from "@/services/home/pages/home_page";
import Profile, { metadataProfile } from "@/services/profile/pages/profile_info";
export const metadata = metadataProfile;

const dummyUser = {
    name: 'Murdi',
    age: 25,
    gender: Gender.male,
    height: 170,
    bmi: 7.8,
    medical_history: 'Tidak ada',
    physical_activity: PhsyicalActivity.high,
    profile_picture: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100",
    progress: 20,
}

export default function Page() {
    return (
        <Profile user={dummyUser} />
    )
}