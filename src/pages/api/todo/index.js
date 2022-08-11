import db from "../../../lib/db";
import withAuth from "../../../middlewares/withAuth";
import Todo from "../../../models/todo";

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
      const createdTodo = await Todo.create({
        text: req.body.text,
        user: userId,
      });
      if (createdTodo) {
        return res.status(200).json(createdTodo);
      }
      return res.status(400).json({ message: "Bad request" });

    case "DELETE":
      const deletedTodo = await Todo.findOneAndDelete({
        _id: req.body.todoId,
        user: userId,
      });
      return res.status(200).json(deletedTodo);

    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}

export default withAuth(handler);
