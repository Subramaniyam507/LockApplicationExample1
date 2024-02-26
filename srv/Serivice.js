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
const TableLockService_1 = require("./src/Service/TableLockService");
const Utility_1 = require("./src/Utility/Utility");
module.exports = (srv) => {
    srv.after('READ', 'OrderSet', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lockSrv = new TableLockService_1.TableLockService();
            let data = req;
            const lockPromises = data.map((data) => __awaiter(this, void 0, void 0, function* () {
                const payload = Utility_1.Utiltiy.preparePayload(data);
                const lockResponse = yield lockSrv.acquireLock(payload);
                if (lockResponse.isLocked === false) {
                    res.reject('403', lockResponse.message);
                }
            }));
            yield Promise.all(lockPromises);
        });
    });
    srv.on('hello', function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            const lockSrv = new TableLockService_1.TableLockService();
            const data = {
                request: {
                    fields: [
                        "Primary Key data 1 ",
                        "Primary Key data 2 ",
                        "Primary Key data 3"
                    ],
                    tables: [
                        "Table1", "Table2"
                    ],
                    user: "subramaniyam.n@gmail.com",
                    ricef: "ricef1"
                }
            };
            const lockResponse = yield lockSrv.acquireLock(data);
            console.log(lockResponse);
            return JSON.stringify(lockResponse);
        });
    });
};
