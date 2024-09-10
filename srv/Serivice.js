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
    // acquiring lock before the READ generic Event
    srv.before('READ', 'Books', function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            const lockSrv = new TableLockService_1.TableLockService();
            let data = req.data;
            // looping through entries to be read from data base 
            // creating local asynchronous context for loop to enhance performance
            const lockPromises = data.map((dataEntry) => __awaiter(this, void 0, void 0, function* () {
                const payload = Utility_1.Utiltiy.preparePayload(dataEntry);
                // calling acquire lock endpoint of the table lock serrvice 
                const lockResponse = yield lockSrv.acquireLock(payload);
                //checking if the isLocked flag is true or false
                // if the lock acquisiton has failed then 
                // throw the error message 
                //message attribute returned by the lock service 
                // would have details of the current holder of lock acessing from which application
                if (lockResponse.isLocked === false) {
                    req.reject('403', lockResponse.message);
                }
            }));
            yield Promise.all(lockPromises);
        });
    });
    // Releasing the lock post execution of UPDATE  generic handler
    srv.after('UPDATE', function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            const lockSrv = new TableLockService_1.TableLockService();
            let data = req.data;
            const lockPromises = data.map((dataEntry) => __awaiter(this, void 0, void 0, function* () {
                const payload = Utility_1.Utiltiy.preparePayload(dataEntry);
                const lockResponse = yield lockSrv.acquireLock(payload);
                if (lockResponse.isLockReleased === false) {
                    req.reject('403', lockResponse.message);
                }
            }));
            yield Promise.all(lockPromises);
        });
    });
};
