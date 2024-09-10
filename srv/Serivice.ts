import {ApplicationService} from '@sap/cds'

import { RequestLockAndUnLock, TableData } from "./src/Commontypes/Common";
import { TableLockService } from "./src/Service/TableLockService";
import { Utiltiy } from "./src/Utility/Utility";

export = (srv: ApplicationService) => {

    srv.before('READ','Books', async function (req:any) {
       
        const lockSrv:TableLockService = new TableLockService();
      
         let data:TableData[] = req.data;
         // looping through entries to be read from data base 
         // creating local asynchronous context for loop to enhance performance
         const lockPromises:Promise<void>[] = data.map(
            async(dataEntry)=>{
               const payload:RequestLockAndUnLock = Utiltiy.preparePayload(dataEntry);
               // calling acquire lock endpoint of the table lock serrvice 
               const lockResponse = await lockSrv.acquireLock(payload) ;
       //checking if the isLocked flag is true or false
       // if the lock acquisiton has failed then 
      // throw the error message 
      //message attribute returned by the lock service 
      // would have details of the current holder of lock acessing from which application
               if(lockResponse.isLocked === false){
                 req.reject('403',lockResponse.message);
               }
            }
         );

         await Promise.all(lockPromises);
      
        
    
       
       
    });

    srv.after('UPDATE', async function (req:any) {
       
      const lockSrv:TableLockService = new TableLockService();
      let data:TableData[] = req.data;
      const lockPromises:Promise<void>[] = data.map(
        async(dataEntry)=>{
           const payload:RequestLockAndUnLock = Utiltiy.preparePayload(dataEntry);
           const lockResponse = await lockSrv.acquireLock(payload) ;
           if(lockResponse.isLockReleased === false){
             req.reject('403',lockResponse.message);
           }
        }
     );

     await Promise.all(lockPromises);
       
     
  });
};
