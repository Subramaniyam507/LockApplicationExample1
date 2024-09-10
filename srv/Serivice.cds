using{db} from '../db/datamodel';


service Service1{
  entity BooksSet as projection on db.Books;
}
