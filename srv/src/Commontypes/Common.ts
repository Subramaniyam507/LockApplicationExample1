

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
    Name:string;

}