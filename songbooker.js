if (Meteor.isClient) {
 // Meteor.subscribe("all-songs");

  //songbook list
  Router.route('/', function () {
    Template.songbooks.events({
      'click #new-songbook': function () {
        Books.insert({name: $("#songbook-name").val() });
        $("#songbook-name").reset();
      }
    });

    this.render('songbooks', {data: {songbooks: function(){
        return Books.find({}).fetch();
    }}});
  });
  //songbook
  Router.route('/songbook/:_id', function () {
    songlist = Songs.find({songbook: this.params._id}).fetch();
    songbook = Books.findOne({_id: this.params._id});
    console.log('songlist :', songlist);

    Template.songbook.events({
      'click #new-song': function () {
        Songs.insert({name: $("#song-name").val(),artist: $("#song-artist").val(), songbook: songbook._id });
        $("#song-name").reset();
        $("#song-artist").reset();
      }
    });

    this.render('songbook', {data: {songlist: songlist, bookName: songbook.name}});
  });

  //song
  Router.route('/song/:_id', function () {
    song = Songs.findOne({_id: this.params._id});
    _that = this;
    console.log("Displaying #"+ this.params._id );

    Template.song.events({
      'click #edit': function () {
        _that.render('songEdit',{data:song});
      }
    });

    Template.songEdit.events({
      'click #save-tabs' : function(){
        Songs.update(song._id, {$set:{tabs: $("#song-tabs").val()}});
        _that.render('song', {data:song});
      }
    });

    this.render('song', {data:song});
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });

}
