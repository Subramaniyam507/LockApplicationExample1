import { Request } from "@sap/cds";
import { RequestLockAndUnLock, TableData } from "../Commontypes/Common";
import cds = require("@sap/cds");









export class Utiltiy{



     public static preparePayload(data:TableData){
        let fields:string[] = [data.ID.toString(),data.Name]
        let tables:string[] = ["Books"]
        const user = cds.context?.user.id as string;
        const payload:RequestLockAndUnLock={
            request:{
                fields:fields,
                tables:tables,
                user:user,
                ricef:"APP1"

            }
        }

       return payload
    }
}