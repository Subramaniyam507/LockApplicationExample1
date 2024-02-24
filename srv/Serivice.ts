import { ApplicationService } from "@sap/cds";
import cds = require("@sap/cds");
import { RequestLockAndUnLock, TableData } from "./src/Commontypes/Common";
import { TableLockService } from "./src/Service/TableLockService";
import { Utiltiy } from "./src/Utility/Utility";

export = (srv: ApplicationService) => {

    srv.after('READ','OrderSet', async function (req,res) {
       
        const lockSrv:TableLockService = new TableLockService();
      
         let data:TableData[] = req;
         const lockPromises:Promise<void>[] = data.map(
            async(data)=>{
               const payload:RequestLockAndUnLock = Utiltiy.preparePayload(data);
               const lockResponse = await lockSrv.acquireLock(payload) ;
               if(lockResponse.isLocked === false){
                 res.reject('403',lockResponse.message);
               }
            }
         );

         await Promise.all(lockPromises);
      
        
    
       
       
    });

   
};
