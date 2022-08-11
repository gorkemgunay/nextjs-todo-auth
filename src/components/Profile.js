import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/todo/todoApi";
import { useLogoutMutation, useMeQuery } from "../features/user/userApi";
import { clearAccessToken } from "../features/user/userSlice";

export default function Profile() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation();
  const { data: user, refetch: refetchMe } = useMeQuery();
  const {
    data: todos,
    isLoading: isLoadingTodos,
    refetch: refetchTodos,
  } = useGetTodosQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    refetchMe();
    refetchTodos();
  }, [accessToken, refetchMe, refetchTodos]);

  return (
    <div className="flex items-center justify-center flex-col gap-4 pb-10">
      <h2 className="text-xl font-semibold">{user.email}</h2>
      {!isLoadingTodos && todos.length !== 0 && todos.length > 1 && (
        <h4 className="text-sm font-semibold">{todos.length} todos</h4>
      )}
      {!isLoadingTodos && todos.length !== 0 && todos.length === 1 && (
        <h4 className="text-sm font-semibold">{todos.length} todo</h4>
      )}
      <button
        type="button"
        onClick={async () => {
          const response = await logout();
          if (response.data && !isLoadingLogout) {
            dispatch(clearAccessToken());
            toast.success(response.data.message);
            return router.push("/auth/login");
          }
        }}
        className="flex items-center h-10 px-2 rounded text-sm font-semibold bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1 disabled:cursor-not-allowed"
      >
        Logout
      </button>
    </div>
  );
}
