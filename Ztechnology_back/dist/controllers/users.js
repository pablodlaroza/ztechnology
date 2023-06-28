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
exports.deleteUser = exports.updateUser = exports.saveUsers = exports.consultUsers = void 0;
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
    const { username, password, idRol, state } = req.body;
    console.log('Username Registrado:', username);
    const user = yield users_1.default.create({
        username, password, idRol, state
    });
    res.status(200).json({
        msg: `Se ha registrado un usuario con el id: ${user.dataValues.id}`
    });
});
exports.saveUsers = saveUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, password, idRol, state } = req.body;
    console.log(req.body);
    const user = yield users_1.default.update({ username, password, idRol, state }, {
        where: {
            id
        }
    });
    res.status(200).json({
        msg: `el usuario con el id ${id} ha sido actualizado`
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.body);
    yield users_1.default.destroy({
        where: {
            id
        }
    });
    res.status(200).json({
        msg: `el usuario con el id ${id} ha sido eliminado`
    });
});
exports.deleteUser = deleteUser;
