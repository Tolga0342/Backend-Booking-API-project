import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenityById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const { name } = req.query;
  const amenities = await getAmenities(name);
  res.status(200).json(amenities);
});

// GET by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);

      res.status(200).json(amenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

// POST

router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const newAmenity = await createAmenity(name);
  if (!newAmenity) {
    res.status(400).json("Name not found.");
  } else {
    res.status(201).json(newAmenity);
  }
});

//PUT
router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedAmenity = await updateAmenityById(id, name);
      res.status(200).json(updatedAmenity);
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
      const deletedAmenityId = await deleteAmenity(id);

      res.status(200).json({
        message: `Amenity with id ${deletedAmenityId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
