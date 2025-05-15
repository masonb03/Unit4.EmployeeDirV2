// routes/employees.js
import express from "express";
import employees from "../db/employees.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(employees);
});

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.send(employee);
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).send("Request body must be provided.");
  }

  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Name is required and must be a non-empty string.");
  }

  const maxId = employees.reduce((max, e) => (e.id > max ? e.id : max), 0);
  const newEmployee = {
    id: maxId + 1,
    name: name.trim(),
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});



export default router;
