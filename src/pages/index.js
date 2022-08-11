import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../features/todo/todoApi";
import { useMeQuery } from "../features/user/userApi";
import withAuth from "../hoc/withAuth";

function Home() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [deleteTodo, { isLoading: isLoadingDelete }] = useDeleteTodoMutation();
  const { refetch: refetchMe } = useMeQuery();
  const {
    data: todos,
    isLoading: isLoadingTodos,
    refetch: refetchTodos,
  } = useGetTodosQuery();

  useEffect(() => {
    refetchMe();
    refetchTodos();
  }, [accessToken, refetchMe, refetchTodos]);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-full mx-auto px-4 mt-10">
        <Profile />
        <div>
          <TodoForm />
        </div>
        {!isLoadingTodos && (
          <div className="flex flex-col gap-4 h-[40rem] overflow-y-scroll my-8 py-8">
            {todos.map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                deleteTodo={deleteTodo}
                refetchTodos={refetchTodos}
                isLoadingDelete={isLoadingDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default withAuth(Home);
