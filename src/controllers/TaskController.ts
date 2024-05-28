import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("Tarea creada");
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error" });
    }
  };

  static getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      if (!tasks) {
        const error = new Error("Tasks not found");
        return res.status(404).json({ error: error.message });
      }

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error" });
    }
  };

  static getTasksById = async (req: Request, res: Response) => {
    try {
      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      res.send("Tarea Actializada");
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      );
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.send("Tarea Eliminada");
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error" });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      req.task.taskStatus = status;
      await req.task.save();
      res.send("Tarea Actualizada");
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error" });
    }
  };
}
