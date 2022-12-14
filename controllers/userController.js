import express from "express";
import { handleValidation } from "../middlewares/handleValidations";
import validators from "../models/view-models";
import {
  saveUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../services/userService";

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    return next(error, req, res);
  }
};
const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await saveUser(body);
    res.status(201).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};
const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await updateUser(body);
    res.status(200).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};
const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    res.status(200).send("User deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", getHandler);
router.post("/", handleValidation(validators.userSchemaValidate) , postHandler);
router.put("/", putHandler);
router.delete("/:id", deleteHandler);

const configure = (app) => {
  app.use("/users", router);
};
export default configure;
