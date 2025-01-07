import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUserById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const { username, email } = req.query;
  const users = await getUsers(username, email);
  res.status(200).json(users);
});

// GET by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

// POST

router.post("/", authMiddleware, async (req, res) => {
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;
  const newUser = await createUser(
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
  );
  if (!newUser) {
    res.status(400).json("Username not found.");
  } else {
    res.status(201).json(newUser);
  }
});

//PUT
router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const updatedUser = await updateUserById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

//Delete
router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUserId = await deleteUser(id);

      res.status(200).json({
        message: `User with id ${deletedUserId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
