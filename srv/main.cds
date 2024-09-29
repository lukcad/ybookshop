using org from '../db/schema';

extend org.qmacro.Books with {
  virtual urgency: String;
}

service bookshop {
  entity Books as projection on org.qmacro.Books actions {
    function stockValue() returns Integer;
  };
  entity Authors as projection on org.qmacro.Authors;
  entity Orders as projection on org.qmacro.Orders;
  //entity OrderItems as projection on org.qmacro.OrderItems;

  function totalStock() returns Integer;
}