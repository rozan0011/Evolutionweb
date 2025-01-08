"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamController_1 = require("../controllers/teamController");
const router = (0, express_1.Router)();
router.get("/", teamController_1.getAllTeamsController);
router.get("/getByID", teamController_1.getTeamByIDController); // http://localhost:3987/api/team/getByID
router.put("/add/member", teamController_1.addMemberTeamController); // http://localhost:3987/api/team/add/member
router.get("/my-team", teamController_1.getTeamByIDController); //  http://localhost:3987/api/team/my-team
router.get("/team-name", teamController_1.getTeamNameByIDController); // http://localhost:3987/api/team/team-name
exports.default = router;
