"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var finalisController_1 = require("../controllers/finalisController");
var router = (0, express_1.Router)();
router.get('/', finalisController_1.getAllFinalisController);
exports.default = router;
