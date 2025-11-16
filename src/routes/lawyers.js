const express = require("express");
const router = express.Router();
const lawyerController = require("../controllers/lawyerController");
const { lawyerAuth } = require("../middleware/auth");

router.post("/register", lawyerController.lawyerRegister);
router.post("/login", lawyerController.lawyerLogin);
router.get("/", lawyerController.getAllLawyers);
router.get("/:id", lawyerController.getLawyerById);
router.put("/profile", lawyerAuth, lawyerController.updateLawyerProfile);

module.exports = router;
