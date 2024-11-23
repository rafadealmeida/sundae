import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/login-form"), {
  loading: () => <p>Loading...</p>,
});

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </main>
  );
}
