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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUsers = exports.consultUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const consultUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.default.findAll();
    res.status(200).json({
        msg: 'Usuarios',
        users
    });
});
exports.consultUsers = consultUsers;
const saveUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username: username, password, idRol } = req.body;
    const user = yield users_1.default.create({
        username: username,
        password: password,
        idRol: idRol
    });
    console.log('Username recibido:', username);
    res.status(200).json({
        msg: `Se ha registrado un usuario con el id: ${user.dataValues.id}`
    });
});
exports.saveUsers = saveUsers;
