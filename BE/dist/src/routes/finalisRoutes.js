"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finalisController_1 = require("../controllers/finalisController");
const router = (0, express_1.Router)();
router.get('/', finalisController_1.getAllFinalisController);
exports.default = router;
