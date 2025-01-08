"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = require("../controllers/registerController");
const router = (0, express_1.Router)();
router.get("/", registerController_1.getAllRegisterController);
router.get("/single", registerController_1.getSingleRegisterController); // http://localhost:3987/api/register/:id
router.put("/:id", registerController_1.updateRegisterController);
router.delete("/:id", registerController_1.deleteRegisterController);
//auth
router.post("/", registerController_1.createRegisterController); // http://localhost:3987/api/register
router.post("/login", registerController_1.loginRegisterController); // http://localhost:3987/api/register/login
router.post("/logout", registerController_1.logoutRegisterController); // http://localhost:3987/api/register/logout
exports.default = router;
