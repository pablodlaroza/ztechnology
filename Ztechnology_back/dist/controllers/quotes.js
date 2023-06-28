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
exports.deleteQuote = exports.updateQuote = exports.saveQuotes = exports.consultQuotes = void 0;
const quotes_1 = __importDefault(require("../models/quotes"));
const consultQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield quotes_1.default.findAll({
        attributes: ['description', 'idSeller', 'idDiscount', 'shipping_cost', 'total']
    });
    res.status(200).json({
        msg: 'Cotizaciones',
        quotes
    });
});
exports.consultQuotes = consultQuotes;
const saveQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, idSeller, idDiscount, shipping_cost, total } = req.body;
    console.log('Cotizacion Registrada:', description);
    const quotes = yield quotes_1.default.create({
        description, idSeller, idDiscount, shipping_cost, total
    });
    res.status(200).json({
        msg: `Se ha registrado una cotizacion con el id: ${quotes.dataValues.id}`
    });
});
exports.saveQuotes = saveQuotes;
const updateQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, description, idSeller, idDiscount, shipping_cost, total } = req.body;
    console.log(req.body);
    const quotes = yield quotes_1.default.update({ description, idSeller, idDiscount, shipping_cost, total }, {
        where: {
            id
        }
    });
    res.status(200).json({
        msg: `la cotizacion ${id} ha sido actualizada`
    });
});
exports.updateQuote = updateQuote;
const deleteQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.body);
    yield quotes_1.default.destroy({
        where: {
            id
        }
    });
    res.status(200).json({
        msg: `la cotizacion ${id} ha sido eliminada`
    });
});
exports.deleteQuote = deleteQuote;
