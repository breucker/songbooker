if (Meteor.isClient) {
  Meteor.subscribe("all-songs");

  //songbook
  Router.route('/', function () {
    var songlist = Songs.find({}).fetch();
    console.log('songlist :', songlist);
    this.render('songbook', {data: {songlist: songlist}});
  });

  //song
  Router.route('/song/:_id', function () {
    var song = Songs.findOne({_id: this.params._id});

    console.log("Displaying #"+ this.params._id );
    this.render('song', {data:song});
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });

}
