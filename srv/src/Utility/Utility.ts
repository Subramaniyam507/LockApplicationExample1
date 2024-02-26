import { Request } from "@sap/cds";
import { RequestLockAndUnLock, TableData } from "../Commontypes/Common";









export class Utiltiy{



     public static preparePayload(data:TableData){
        let fields:string[] = [data.ID.toString(),data.customer_ID.toString()]
        let tables:string[] = ["Orders","Customers"]
        const user = cds.context.user.id as string;
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