namespace db;


entity Customers{
    key ID:Integer;
    firstName:String;
    lastName:String;
    age:Integer;
    country:String;
}

entity Order{
    key ID:Integer;
    product:String;
    totalamount:String;
    customer:Association to Customers;
}