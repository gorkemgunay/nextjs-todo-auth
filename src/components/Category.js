export default function Category({
  category,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div
      onClick={() => setSelectedCategory(category._id)}
      className={`p-2 w-48 flex items-center justify-center text-sm font-semibold border-b-2 border-transparent ${
        category._id === selectedCategory && "border-b-blue-600"
      } cursor-pointer transition-all`}
    >
      {category.name}
    </div>
  );
}
