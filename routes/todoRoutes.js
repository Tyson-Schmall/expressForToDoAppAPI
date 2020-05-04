const express = require("express");

const router = express.Router();
const TodoModel = require("../models/todoModel");

router.get("/todos/test", (req, res) => {
  return res.status(200).send("<h1>Todo Routes</h1>");
});

// GET
router.get("/todos", (req, res) => {
  TodoModel.find((err, results) => {
    if (err) {
      res.status(404).json({
        error: true,
        message: "Could not GET all todos, sorry for the inconvenience..",
      });
    } else {
      const newResults = results.map((todo) => {
        return {
          id: todo._id,
          title: todo.title,
          done: todo.done,
        };
      });
      res.status(200).json({ results: newResults });
    }
  });
});

// GET ONE
router.get("/todo/:id", (req, res) => {
  TodoModel.findById(req.params.id);
});

// POST
router.post("/todo", (req, res) => {
  const newTodo = new TodoModel(req.body);

  newTodo
    .save()
    .then((todo) => {
      res
        .status(200)
        .json({ id: todo._id, title: todo.title, done: todo.done });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: true, message: "There was an error with your request" });
    });
});

// PUT/PATCH
// DELETE
router.delete("/todo/:id", (req, res) => {
  TodoModel.findByIdAndRemove(req.params.id),
    (err, todo) => {
      if (err) {
        res.status(500).json({
          error: true,
          message: "We could not complete your request.",
        });
      } else if (todo) {
        res.status(200).json({
          message: "Successfully removed the requested item. Thank you.",
          id: todo._id,
        });
      } else {
        res
          .status(500)
          .json({
            error: true,
            message:
              "Specified Todo does not exist, sorry for any inconvenience.",
          });
      }
    };
});

module.exports = router;
