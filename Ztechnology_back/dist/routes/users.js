"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/consultUsers', users_1.consultUsers);
router.post('/saveUser', users_1.saveUsers);
exports.default = router;
