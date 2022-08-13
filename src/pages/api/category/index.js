import db from "../../../lib/db";
import withAuth from "../../../middlewares/withAuth";
import Category from "../../../models/category";
import User from "../../../models/user";

async function handler(req, res) {
  const { method } = req;
  const { userId } = req.payload;
  await db();

  switch (method) {
    case "GET":
      const categories = await Category.find({ user: userId });
      return res.status(200).json(categories);

    case "POST":
      if (!req.body.name) {
        return res.status(400).json({ message: "Category name is required" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (user.categories.length === 3) {
        return res
          .status(401)
          .json({
            message:
              "You have reached the maximum number of category creations",
          });
      }

      const createdCategory = await Category.create({
        name: req.body.name,
        user: userId,
      });
      if (createdCategory) {
        user.categories.push(createdCategory._id);
        await user.save();
        return res.status(200).json(createdCategory);
      }
      return res.status(400).json({ message: "Bad request" });

    case "DELETE":
      if (!req.body.categoryId) {
        return res.status(400).json({ message: "Category id is required" });
      }

      const category = await Category.findOne({
        _id: req.body.categoryId,
        user: userId,
      });

      if (category) {
        if (category.todos.length === 0) {
          await Category.findOneAndDelete({
            _id: req.body.categoryId,
            user: userId,
          });

          await User.findByIdAndUpdate(userId, {
            $pull: { categories: req.body.categoryId },
          });

          return res.status(200).json(category);
        }
        return res.status(400).json({
          message:
            "To delete this category first delete all todos related to this category",
        });
      }

      return res.status(400).json({ message: "Bad request" });
    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}

export default withAuth(handler);
