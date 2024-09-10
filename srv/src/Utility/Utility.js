"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utiltiy = void 0;
const cds = require("@sap/cds");
class Utiltiy {
    static preparePayload(data) {
        var _a;
        let fields = [data.ID.toString(), data.Name];
        let tables = ["Books"];
        const user = (_a = cds.context) === null || _a === void 0 ? void 0 : _a.user.id;
        const payload = {
            request: {
                fields: fields,
                tables: tables,
                user: user,
                ricef: "ricef1"
            }
        };
        return payload;
    }
}
exports.Utiltiy = Utiltiy;
