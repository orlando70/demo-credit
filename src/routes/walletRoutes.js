"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Wallet_1 = require("../controllers/Wallet");
var isAuthenticated_1 = require("../middleware/isAuthenticated");
var enums_1 = require("../utils/enums");
var router = (0, express_1.Router)();
router.post('/transfer', (0, isAuthenticated_1["default"])(enums_1.TokenFlagEnum.AUTH), Wallet_1["default"].Transfer);
exports["default"] = router;
