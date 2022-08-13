import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/user/userApi";
import { clearAccessToken } from "../features/user/userSlice";

export default function Profile({ user }) {
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center flex-col gap-4 pb-10">
      <h2 className="text-xl font-semibold">{user.email}</h2>
      {user.todos.length > 1 && (
        <h4 className="text-sm font-semibold">{user.todos.length} todos</h4>
      )}
      {user.todos.length === 1 && (
        <h4 className="text-sm font-semibold">{user.todos.length} todo</h4>
      )}
      <button
        type="button"
        onClick={async () => {
          try {
            await logout().unwrap();
            dispatch(clearAccessToken());
            toast.success("Successfully logout");
            router.push("/auth/login");
          } catch (error) {
            toast.error(error.data.message);
          }
        }}
        className="flex items-center justify-center h-10 px-2 rounded text-sm font-semibold bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1 disabled:cursor-not-allowed"
      >
        Logout
      </button>
    </div>
  );
}
