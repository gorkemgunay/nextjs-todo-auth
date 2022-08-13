import db from "../../../lib/db";
import withAuth from "../../../middlewares/withAuth";
import Todo from "../../../models/todo";
import User from "../../../models/user";

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
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const createdTodo = await Todo.create({
        text: req.body.text,
        user: userId,
      });
      if (createdTodo) {
        user.todos.push(createdTodo._id);
        await user.save();
        return res.status(200).json(createdTodo);
      }
      return res.status(400).json({ message: "Bad request" });

    case "DELETE":
      if (!req.body.todoId) {
        return res.status(400).json({ message: "Todo id is required" });
      }
      const deletedTodo = await Todo.findOneAndDelete({
        _id: req.body.todoId,
        user: userId,
      });
      const deleteUserTodo = await User.findByIdAndUpdate(userId, {
        $pull: { todos: deletedTodo._id },
      });
      if (deletedTodo && deleteUserTodo) {
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
