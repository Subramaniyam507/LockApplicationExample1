using{db} from '../db/datamodel';


service Service1{
  entity CustomerSet as projection on db.Customers;
  entity OrderSet as projection on db.Order;

  function hello() returns String;
}