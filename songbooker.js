if (Meteor.isClient) {
  //Songs = new Meteor.Collection("songs");
  Meteor.subscribe("all-songs");
  Template.songs.songlist = Songs.find({}).fetch();

  Template.songs.events({
    'click input' : function (e) {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button #"+e.attr("data-id"));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });

}
