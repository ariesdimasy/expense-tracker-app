const express = require("express");
const router = express.Router();

const controller = require("../controllers");

router.get("/generate-table",controller.expenseController.expenseGenerate)
router.get("/", controller.expenseController.expenseList);
router.get("/detail/total", controller.expenseController.expenseTotal);
router.get("/:id", controller.expenseController.expenseDetail);
router.post("/", controller.expenseController.expenseCreate);
router.put("/:id", controller.expenseController.expenseUpdate);
router.delete("/:id", controller.expenseController.expenseDelete);

module.exports = router;
