import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handlerInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";
import { taskBelongToProject, taskExist } from "../middleware/task";

const router = Router();

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Proyecto es Obligatorio"),
  handlerInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProject);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("Id No Valido"),
  handlerInputErrors,
  ProjectController.getProjectById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("Id No Valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Proyecto es Obligatorio"),
  handlerInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Id No Valido"),
  handlerInputErrors,
  ProjectController.deleteProject
);

/// Routes for Task  ////
router.param("projectId", validateProjectExist);

router.post(
  "/:projectId/task",
  param("projectId").isMongoId().withMessage("Id No Valido"),
  body("name").notEmpty().withMessage("El Nombre de la tarea es Obligatoria"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es Obligatorio"),
  handlerInputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/task",
  param("projectId").isMongoId().withMessage("Id No Valido"),
  TaskController.getAllTasks
);

//Param Task middleware
router.param("taskId", taskExist);
router.param("taskId", taskBelongToProject);

router.get(
  "/:projectId/task/:taskId",
  param("projectId").isMongoId().withMessage("Id tarea No Valido"),
  param("taskId").isMongoId().withMessage("Id project No Valido"),
  TaskController.getAllTasks
);

router.put(
  "/:projectId/task/:taskId",
  param("projectId").isMongoId().withMessage("Id tarea No Valido"),
  param("taskId").isMongoId().withMessage("Id project No Valido"),
  TaskController.updateTask
);

router.delete(
  "/:projectId/task/:taskId",
  param("projectId").isMongoId().withMessage("Id tarea No Valido"),
  param("taskId").isMongoId().withMessage("Id project No Valido"),
  TaskController.deleteTask
);

router.post(
  "/:projectId/task/:taskId/status",
  param("projectId").isMongoId().withMessage("Id tarea No Valido"),
  param("taskId").isMongoId().withMessage("Id project No Valido"),
  body("status").notEmpty().withMessage("El Estado de la tarea es Obligatorio"),
  TaskController.updateStatus
);

export default router;
