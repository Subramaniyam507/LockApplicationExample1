

export interface RequestLockAndUnLock{
    request:{
        fields:string[];
        tables:string[];
        user:string;
        ricef:string;
    }
}

export interface TableData{
    ID:number;
    product:string;
    totalamount:string;
    customer_ID:number;
}