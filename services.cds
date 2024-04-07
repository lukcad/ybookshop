//using { cuid } from '@sap/cds/common';

aspect cuid {
  key ID: UUID;
}

service bookshop {
  entity Books: cuid {

    title: String;
    author: Association to Authors;
  }
  entity Authors: cuid {

    name: String;
    books: Association to many Books on books.author = $self;
  }
}

service noteshop {
  entity Books: cuid {

    title: String;
    author_foreing_key: type of Authors:ID;
    author: Association to Authors on author.ID = author_foreing_key;
  }

  entity Authors: cuid {

    name: String;
  }
}
