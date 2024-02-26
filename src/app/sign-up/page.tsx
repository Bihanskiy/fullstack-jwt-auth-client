import { AppRegisterForm } from "@/modules/app-register-form";

export default function SignUp() {

  return (
    <section className="w-full py-5">
      <div className="max-w-96 mx-auto bg-white p-4 rounded-2xl">
      <AppRegisterForm />
      </div>
    </section>
  );
}
