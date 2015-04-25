# SongBookger - Routing + Template logic

#main layout declaration
Router.configure
  layoutTemplate: 'layout'


#songbook list (home route)

Router.route '/', ->
  Template.songbooks.events 'click #new-songbook': ->
    Books.insert name: $('#songbook-name').val()
    $('input').val('')

  @render 'songbooks', data: songbooks: ->
    Books.find({}).fetch()

#songbook
Router.route '/songbook/:_id', ->
  #fetching the param to use it later (works better that way in events)
  songBookId = @params._id

  #songbook Helpers
  Template.songbook.helpers
    songlist: =>      
      Songs.find(songbook: songBookId).fetch()
    songbook: =>
      Books.findOne(_id: songBookId)
  
  #songbook events
  Template.songbook.events 'click #new-song': (e,t)=>
    console.log songBookId
    Songs.insert
      name: $('#song-name').val()
      artist: $('#song-artist').val()
      songbook: songBookId
    $('input').val('')
  
  #rendering songbook
  @render 'songbook'

#song
Router.route '/song/:_id', ->
  @song = Songs.findOne(_id: @params._id)
  console.log 'Displaying #' + @params._id
  
  Template.song.events 'click #edit': =>
    console.log 'song', @song
    Router.go '/song/'+@params._id+'/edit'

  @render 'song', data: @song

Router.route '/song/:_id/edit', ->
  @song = Songs.findOne(_id: @params._id)

  Template.songEdit.events 'click #save-tabs': =>
    console.log 'update song', @song
    Songs.update @song._id, $set: {tabs: $('#song-tabs').val(), artist: $('#song-artist').val(), name: $('#song-name').val()}
    Router.go '/song/'+@params._id
    
  @render 'songEdit', data: @song

