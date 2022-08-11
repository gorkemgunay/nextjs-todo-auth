import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../features/user/userApi";
import { setAccessToken } from "../../features/user/userSlice";

function Login() {
  const [email, setEmail] = useState("gorkem@gg.com");
  const [password, setPassword] = useState("123123");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-4 max-w-2xl mx-auto">
      <div className="prose">
        <h2>Login</h2>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await login({ email, password });
          if (response.data && !isLoading) {
            dispatch(setAccessToken({ accessToken: response.accessToken }));
            return router.push("/");
          }
          if (response.error) {
            toast.error(response.error.data.message);
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
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center h-10 px-2 text-sm bg-blue-600 text-gray-50 font-semibold rounded disabled:cursor-not-allowed disabled:bg-blue-100 disabled:text-blue-600"
        >
          Login
        </button>
      </form>
      <div className="flex items-center gap-1">
        <p className="text-xs text-gray-600">Don&apos;t have an account?</p>
        <p className="text-blue-600 text-sm font-semibold">
          <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
