var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
import mongoose from 'mongoose';
import EventModel from '../models/event.js';
export var getUpcomingEvents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var today, tomorrow, endOfToday, endOfTomorrow, todayEvents, tomorrowEvents, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                tomorrow = new Date(new Date().setDate(today.getDate() + 1));
                endOfToday = new Date(new Date().setHours(23, 59, 59, 59));
                endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 59));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, EventModel.find({ date: { $gte: today.toISOString(), $lt: endOfToday.toISOString() } }).sort({ date: 1 })];
            case 2:
                todayEvents = _a.sent();
                return [4 /*yield*/, EventModel.find({ date: { $gte: endOfToday.toISOString(), $lt: endOfTomorrow.toISOString() } }).sort({ date: 1 })];
            case 3:
                tomorrowEvents = _a.sent();
                res.status(200).json({ data: { todayEvents: todayEvents, tomorrowEvents: tomorrowEvents } });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(404).json({ error: error_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var getAllEvents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var today, events, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, EventModel.find({ date: { $gte: today.toISOString() } }).sort({ date: 1 })];
            case 2:
                events = _a.sent();
                res.status(200).json({ data: events });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(404).json({ error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, event, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!mongoose.isValidObjectId(id))
                    return [2 /*return*/, res.status(404).json({ error: 'Event id is not valid' })];
                return [4 /*yield*/, EventModel.findById(id)];
            case 2:
                event = _a.sent();
                res.status(200).json({ data: event });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(404).json({ error: error_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getYourEvents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var today, _id, authorEvents, participantEvents, authorArchivalEvents, participantArchivalEvents, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                _id = req.user._id.toString();
                return [4 /*yield*/, EventModel.find({ $and: [{ creator: _id }, { date: { $gte: today.toISOString() } }] }).sort({ date: 1 })];
            case 2:
                authorEvents = _a.sent();
                return [4 /*yield*/, EventModel.find({ $and: [{ participants: { $in: [_id] } }, { creator: { $ne: _id } }, { date: { $gte: today.toISOString() } }] }).sort({ date: 1 })];
            case 3:
                participantEvents = _a.sent();
                return [4 /*yield*/, EventModel.find({ $and: [{ creator: _id }, { date: { $lte: today.toISOString() } }] }).sort({ date: 1 })];
            case 4:
                authorArchivalEvents = _a.sent();
                return [4 /*yield*/, EventModel.find({ $and: [{ participants: { $in: [_id] } }, { creator: { $ne: _id } }, { date: { $lte: today.toISOString() } }] }).sort({ date: 1 })];
            case 5:
                participantArchivalEvents = _a.sent();
                res.status(200).json({ data: { authorEvents: authorEvents, participantEvents: participantEvents, authorArchivalEvents: authorArchivalEvents, participantArchivalEvents: participantArchivalEvents } });
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                res.status(404).json({ error: error_4.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
export var getEventBySearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, searchQuery, today, event, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = req.query.search;
                searchQuery = search ? new RegExp(search, 'i') : null;
                today = new Date();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, EventModel.find({ $and: [{ $or: [{ title: searchQuery }, { cathegory: searchQuery }, { city: searchQuery }, { address: searchQuery }] }, { date: { $gte: today.toISOString() } }] }).sort({ date: 1 })];
            case 2:
                event = _a.sent();
                res.status(200).json({ data: event });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(404).json({ error: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var createEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, date, cathegory, city, emptyFields, event, newEvent, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, date = _a.date, cathegory = _a.cathegory, city = _a.city;
                emptyFields = [];
                if (!title)
                    emptyFields.push('title');
                if (!description)
                    emptyFields.push('description');
                if (!date)
                    emptyFields.push('date');
                if (!cathegory)
                    emptyFields.push('cathegory');
                if (!city)
                    emptyFields.push('city');
                if (emptyFields.length > 0)
                    return [2 /*return*/, res.status(400).json({ error: { errorMessage: 'Wypełnij wszystkie wymagane pola', emptyFields: emptyFields } })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                event = __assign(__assign({}, req.body), { participants: [req.user._id], participantsNames: [req.user.name], creator: req.user._id });
                return [4 /*yield*/, EventModel.create(__assign({}, event))];
            case 2:
                newEvent = _b.sent();
                res.status(201).json({ data: newEvent });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                res.status(409).json({ error: error_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var joinEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, motivation, resignation, event, banned, index, updatedEvent, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, motivation = _a.motivation, resignation = _a.resignation;
                if (!mongoose.isValidObjectId(id))
                    return [2 /*return*/, res.status(404).json({ error: 'Event id is not valid' })];
                return [4 /*yield*/, EventModel.findById(id)];
            case 1:
                event = _b.sent();
                banned = event.banned.findIndex(function (id) { return id === String(req.user._id); }) === -1 ? false : true;
                if (banned)
                    return [2 /*return*/, res.status(404).json({ error: 'You have already resigned from this event' })];
                index = event.participants.findIndex(function (id) { return id === String(req.user._id); });
                if (index === -1) {
                    if (!motivation)
                        return [2 /*return*/, res.status(404).json({ error: 'Quote your motivation' })];
                    event.participants.push(req.user._id);
                    event.participantsNames.push(req.user.name);
                    event.motivations.push(motivation);
                }
                else {
                    if (!resignation)
                        return [2 /*return*/, res.status(404).json({ error: 'Quote your resignation' })];
                    event.participants = event.participants.filter(function (id) { return id !== String(req.user._id); });
                    event.participantsNames = event.participantsNames.filter(function (n) { return n !== String(req.user.name); });
                    event.resignations.push(resignation);
                    event.banned.push(req.user._id);
                }
                return [4 /*yield*/, EventModel.findByIdAndUpdate(id, event, { new: true })];
            case 2:
                updatedEvent = _b.sent();
                res.status(200).json(updatedEvent);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _b.sent();
                res.status(404).json({ error: error_7.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
