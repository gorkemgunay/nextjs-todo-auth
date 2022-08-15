import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../features/user/userApi";
import withRedirect from "../../hoc/withRedirect";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-4 max-w-2xl mx-auto">
      <div className="prose">
        <h2>Register</h2>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await register({ email, password }).unwrap();
            toast.success("Successfully register");
            return router.push("/auth/login");
          } catch (error) {
            toast.error(error.data.message);
          }
        }}
        className="flex flex-col gap-4 w-full px-4"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 rounded px-2 h-10"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-2 h-10"
        />
        <button
          disabled={isLoading}
          className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1 disabled:cursor-not-allowed"
        >
          Register
        </button>
      </form>
      <div className="flex items-center gap-1">
        <p className="text-xs text-gray-600">Have an account?</p>
        <p className="text-blue-600 text-sm font-semibold">
          <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default withRedirect(Register);
