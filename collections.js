// declare collections
// this code should be included in both the client and the server
Books = new Meteor.Collection("books");
Songs = new Meteor.Collection("songs");
//Parties = new Meteor.Collection("parties");

// server: populate collections with some initial documents
Books.insert({name: "My first songbook"});
var myBooks = Books.find({}).fetch();
Songs.insert({name:"Stairway to heaven", artist:"Led Zepplin", tabs:"A B C D", book: myBooks[0]._id});
