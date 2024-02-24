import cds = require("@sap/cds");
import { RequestLockAndUnLock } from "../Commontypes/Common";



export class TableLockService{

    public async acquireLock(payload:RequestLockAndUnLock){
        const lockservice = await cds.connect.to('table_lock');
        const resp = await lockservice.post("/odata/v4/distributed-cache/acquireLock",payload);
        return resp;
    }

    public async releaseLock(payload:RequestLockAndUnLock){
        const lockservice = await cds.connect.to('table_lock');
        const resp = await lockservice.post("/odata/v4/distributed-cache/releaseLock",payload);
        return resp;
    } 

    
    
}