import db from "../../../lib/db";
import withAuth from "../../../middlewares/withAuth";
import Todo from "../../../models/todo";
import User from "../../../models/user";
import Category from "../../../models/category";

async function handler(req, res) {
  const { method } = req;
  const { userId } = req.payload;
  await db();

  switch (method) {
    case "GET":
      const todos = await Todo.find({ user: userId });
      return res.status(200).json(todos);

    case "POST":
      if (!req.body.text) {
        return res.status(400).json({ message: "Todo text is required" });
      }
      if (!req.body.categoryId) {
        return res.status(400).json({ message: "Todo category is required" });
      }
      const category = await Category.findOne({
        _id: req.body.categoryId,
        user: userId,
      });

      if (!category) {
        return res.status(400).json({ message: "Bad request" });
      }
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const createdTodo = await Todo.create({
        text: req.body.text,
        category: req.body.categoryId,
        user: userId,
      });

      if (createdTodo) {
        user.todos.push(createdTodo._id);
        category.todos.push(createdTodo._id);
        await user.save();
        await category.save();
        return res.status(200).json(createdTodo);
      }
      return res.status(400).json({ message: "Bad request" });

    case "PATCH":
      if (!req.body.todoId) {
        return res.status(400).json({ message: "Todo id is required" });
      }
      const todo = await Todo.findOne({ _id: req.body.todoId, user: userId });
      if (todo) {
        const updatedTodo = await Todo.findOneAndUpdate(
          { _id: req.body.todoId, user: userId },
          { done: !todo.done }
        );
        if (updatedTodo) {
          return res.status(200).json(updatedTodo);
        }
        return res.status(400).json({ message: "Bad request" });
      }
      return res.status(400).json({ message: "Bad request" });

    case "DELETE":
      if (!req.body.todoId) {
        return res.status(400).json({ message: "Todo id is required" });
      }

      if (!req.body.categoryId) {
        return res.status(400).json({ message: "Category id is required" });
      }

      const deletedTodo = await Todo.findOneAndDelete({
        _id: req.body.todoId,
        user: userId,
      });
      const deleteUserTodo = await User.findByIdAndUpdate(userId, {
        $pull: { todos: deletedTodo._id },
      });

      const deleteCategoryTodo = await Category.findOneAndUpdate(
        {
          _id: req.body.categoryId,
          user: userId,
        },
        { $pull: { todos: req.body.todoId } }
      );
      if (deletedTodo && deleteUserTodo && deleteCategoryTodo) {
        return res.status(200).json(deletedTodo);
      }
      return res.status(400).json({ message: "Bad request" });
    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}

export default withAuth(handler);
