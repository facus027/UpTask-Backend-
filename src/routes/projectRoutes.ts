import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handlerInputErrors } from "../middleware/validation";

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

export default router;
