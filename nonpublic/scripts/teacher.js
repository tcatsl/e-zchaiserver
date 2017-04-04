$(document).ready(function(){
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $.get('/isteacher').always((data1)=>{
      if (data1 !== "true"){
        window.location = '/reqteach.html'
      }
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<button id="logout-button">Log Out</button>')
    // $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location.reload())
    })
  })
  }
})
  $('#login').click(function(e){
            window.location = '/login'
          })
})
