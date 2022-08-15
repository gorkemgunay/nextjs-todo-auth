import { useMemo } from "react";
import Profile from "../components/Profile";
import Todos from "../components/Todos";
import Categories from "../components/Categories";
import Layout from "../components/Layout";
import { useGetTodosQuery } from "../features/todo/todoApi";
import { useMeQuery } from "../features/user/userApi";
import withAuth from "../hoc/withAuth";
import { useGetCategoriesQuery } from "../features/category/categoryApi";

function Home() {
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
      <Profile user={user} />
      {!isLoadingCategories && <Categories categories={categories} />}
      {!isLoadingTodos && todos.length === 0 && !isLoadingCategories && (
        <div className="p-4 bg-yellow-100 text-yellow-600 rounded my-8 text-sm font-semibold">
          {categories.length === 0
            ? "There is no todo here. To create todo, first create category."
            : "There is no todo here. Create one."}
        </div>
      )}
      {!isLoadingTodos && <Todos sortedTodos={sortedTodos} />}
    </Layout>
  );
}

export default withAuth(Home);
