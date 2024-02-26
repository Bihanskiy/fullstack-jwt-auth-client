import { AppLoginForm } from "@/modules/app-login-form";


export default function SignIn() {

  return (
    <section className="w-full py-5">
      <div className="max-w-96 mx-auto bg-white p-4 rounded-2xl">
        <AppLoginForm />
      </div>
    </section>
  );
}
