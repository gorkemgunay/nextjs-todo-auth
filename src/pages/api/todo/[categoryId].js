import db from "../../../lib/db";
import withAuth from "../../../middlewares/withAuth";
import Todo from "../../../models/todo";

async function handler(req, res) {
  const { method } = req;
  const { userId } = req.payload;
  await db();

  switch (method) {
    case "GET":
      const categoryTodos = await Todo.find({
        user: userId,
        category: req.query.categoryId,
      });
      if (categoryTodos) {
        return res.status(200).json(categoryTodos);
      }
      return res.status(400).json({ message: "Bad request" });

    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}

export default withAuth(handler);
