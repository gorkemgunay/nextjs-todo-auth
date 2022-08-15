import Category from "./Category";

export default function Categories({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex items-center justify-center mt-16">
      <div
        onClick={() => setSelectedCategory("all")}
        className={`p-2 w-48 flex items-center justify-center text-sm font-semibold border-b-2 border-transparent ${
          selectedCategory === "all" && "border-b-blue-600"
        } cursor-pointer transition-all`}
      >
        All
      </div>
      {categories.map((category) => (
        <Category
          key={category._id}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
}
