const express = require("express");
const {
  computeExecution,
  simulate,
} = require("../controllers/execution.controller");
const { protect } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/:id/compute-execution", protect, computeExecution);
router.post("/:id/simulate", protect, simulate);

module.exports = router;
