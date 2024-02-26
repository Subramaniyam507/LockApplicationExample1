"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utiltiy = void 0;
class Utiltiy {
    static preparePayload(data) {
        let fields = [data.ID.toString(), data.customer_ID.toString()];
        let tables = ["Orders", "Customers"];
        const user = cds.context.user.id;
        const payload = {
            request: {
                fields: fields,
                tables: tables,
                user: user,
                ricef: "APP1"
            }
        };
        return payload;
    }
}
exports.Utiltiy = Utiltiy;
