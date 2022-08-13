import { useMemo, useState } from "react";
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
import { useGetCategoriesQuery } from "../features/category/categoryApi";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteTodo, { isLoading: isLoadingDelete }] = useDeleteTodoMutation();
  const { data: user } = useMeQuery();
  const { data: todos = [], isLoading: isLoadingTodos } = useGetTodosQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const sortedTodos = useMemo(() => {
    const sortedTodos = todos.slice();
    sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sortedTodos;
  }, [todos]);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-full mx-auto px-4 mt-10">
        <Profile
          user={user}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory !== "all" && (
          <div>
            <TodoForm selectedCategory={selectedCategory} />
          </div>
        )}
        <div className="flex items-center justify-center mt-16">
          <div
            onClick={() => setSelectedCategory("all")}
            className={`p-2 w-48 flex items-center justify-center text-sm font-semibold border-b-2 border-transparent ${
              selectedCategory === "all" && "border-b-blue-600"
            } cursor-pointer transition-all`}
          >
            All
          </div>
          {!isLoadingCategories &&
            categories.map((category) => (
              <div
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`p-2 w-48 flex items-center justify-center text-sm font-semibold border-b-2 border-transparent ${
                  category._id === selectedCategory && "border-b-blue-600"
                } cursor-pointer transition-all`}
              >
                {category.name}
              </div>
            ))}
        </div>
        {!isLoadingTodos && todos.length === 0 && !isLoadingCategories && (
          <div className="p-4 bg-yellow-100 text-yellow-600 rounded my-8">
            {categories.length === 0
              ? "There is no todo here. To create todo, first create category."
              : "There is no todo here. Create one."}
          </div>
        )}
        {!isLoadingTodos && (
          <div className="flex flex-col gap-4 h-[36rem] overflow-y-scroll my-8 py-8">
            {selectedCategory === "all" &&
              sortedTodos.map((todo) => (
                <Todo
                  key={todo._id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  isLoadingDelete={isLoadingDelete}
                />
              ))}
            {sortedTodos
              .filter((filterTodo) => filterTodo.category === selectedCategory)
              .map((todo) => (
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
