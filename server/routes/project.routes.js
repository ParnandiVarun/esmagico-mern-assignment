const express = require("express");
const {
  createProject,
  getProjects,
  joinProject,
} = require("../controllers/project.controller");

const { protect } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.post("/join", protect, joinProject);

module.exports = router;
