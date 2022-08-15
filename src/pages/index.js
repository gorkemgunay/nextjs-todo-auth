import { useMemo, useState } from "react";
import Profile from "../components/Profile";
import Todos from "../components/Todos";
import TodoForm from "../components/TodoForm";
import Categories from "../components/Categories";
import Layout from "../components/Layout";
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
    <Layout>
      <Profile
        user={user}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory !== "all" && (
        <TodoForm selectedCategory={selectedCategory} />
      )}
      {!isLoadingCategories && (
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {!isLoadingTodos && todos.length === 0 && !isLoadingCategories && (
        <div className="p-4 bg-yellow-100 text-yellow-600 rounded my-8">
          {categories.length === 0
            ? "There is no todo here. To create todo, first create category."
            : "There is no todo here. Create one."}
        </div>
      )}
      {!isLoadingTodos && (
        <Todos
          sortedTodos={sortedTodos}
          selectedCategory={selectedCategory}
          deleteTodo={deleteTodo}
          isLoadingDelete={isLoadingDelete}
        />
      )}
    </Layout>
  );
}

export default withAuth(Home);
