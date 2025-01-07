"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("./config/db");
var registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
var cors_1 = __importDefault(require("cors"));
var teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
var competitionsRoutes_1 = __importDefault(require("./routes/competitionsRoutes"));
var administrativeRoutes_1 = __importDefault(require("./routes/administrativeRoutes"));
var finalisRoutes_1 = __importDefault(require("./routes/finalisRoutes"));
var app = (0, express_1.default)();
var port = 3987;
var corsOptions = {
    origin: ["https://evolutiontelkomuniversity.com", "http://localhost:5173"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/register", registerRoutes_1.default);
app.use("/api/team", teamRoutes_1.default);
app.use("/api/competitions", competitionsRoutes_1.default);
app.use("/api/administrative", administrativeRoutes_1.default);
app.use("/api/finalis", finalisRoutes_1.default);
app.get("/", function (req, res) {
    res.send("API evolution telkom university .......");
});
var checkDBConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.DBconnection.getConnection()];
            case 1:
                connection = _a.sent();
                console.log("nyambung ke MYSQL anjay :) " + connection.threadId);
                connection.release();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Database connection failed:", error_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkDBConnection()];
            case 1:
                _a.sent();
                app.listen(port, function () {
                    console.log("Server running at http://103.63.24.106:".concat(port));
                });
                return [2 /*return*/];
        }
    });
}); };
startServer();
