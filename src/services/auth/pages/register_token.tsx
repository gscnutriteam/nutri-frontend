import AuthLayout from '@/layout/auth_layout';
import { RegisterTokenForm } from '../components/register_token_form';

export default function RegisterToken() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col outfit-font">
        <img
          src="/assets/img/register-3.png"
          alt="Nubo Welcome"
          className="w-full h-auto mx-auto mt-10"
        />
        <h1 className="text-3xl mt-5 text-center font-semibold">Register</h1>
        <p className="text-center mt-2 text-sm">
          Isi token Anda di bawah ini
        </p>
        <RegisterTokenForm />
      </div>
    </AuthLayout>
  );
}
