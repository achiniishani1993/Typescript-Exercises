import Author from "./Author";
import Book from "./book";
import Member from "./Member";
import Loans from "./Loans";

Author.hasMany(Book, {
  foreignKey: "author_id",
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
});


Member.belongsToMany(Book, {
  through: Loans,
  foreignKey: "member_id",
  otherKey: "book_id",
});
Book.belongsToMany(Member, {
  through: Loans,
  foreignKey: "book_id",
  otherKey: "member_id",
});


export { Book, Author, Member, Loans   };