import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../features/todo/todoApi";
import withAuth from "../hoc/withAuth";

function Home() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [deleteTodo, { isLoading: isLoadingDelete }] = useDeleteTodoMutation();
  const {
    data: todos = [],
    isLoading: isLoadingTodos,
    refetch: refetchTodos,
  } = useGetTodosQuery();

  const sortedTodos = useMemo(() => {
    const sortedTodos = todos.slice();
    sortedTodos.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sortedTodos;
  }, [todos]);

  useEffect(() => {
    refetchTodos();
  }, [accessToken, refetchTodos]);

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
            {sortedTodos.map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                deleteTodo={deleteTodo}
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
