const express = require("express")

const router = express.Router()

const { userController } = require("./../controllers")

router.get("/", userController.getAllUser)
router.post("/", userController.createUser)
router.put("/:id", userController.updateUser)

module.exports = router