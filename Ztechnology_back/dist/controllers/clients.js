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
exports.deleteClient = exports.updateClient = exports.saveClients = exports.consultClients = void 0;
const clients_1 = __importDefault(require("../models/clients"));
const consultClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clients = yield clients_1.default.findAll();
    res.status(200).json({
        msg: 'Clientes',
        clients
    });
});
exports.consultClients = consultClients;
const saveClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { names, last_names, email, adress, phone } = req.body;
    console.log('Cliente Registrado:', names);
    const clients = yield clients_1.default.create({
        names, last_names, email, adress, phone
    });
    res.status(200).json({
        msg: `Se ha registrado un cliente con el id: ${clients.dataValues.id}`
    });
});
exports.saveClients = saveClients;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, names, last_names, email, adress, phone } = req.body;
    console.log(req.body);
    const client = yield clients_1.default.update({ names, last_names, email, adress, phone }, {
        where: {
            id
        }
    });
    res.status(200).json({
        msg: `el cliente con el id ${id} ha sido actualizado`
    });
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.body);
    yield clients_1.default.destroy({
        where: {
            id
        }
    });
    res.status(200).json({
        msg: `el cliente con el id ${id} ha sido eliminado`
    });
});
exports.deleteClient = deleteClient;
