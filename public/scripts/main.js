$(document).ready(function(){
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $.get('/isteacher').always((data)=>{
      if (data == "true"){
        window.location = '/teacherdash.html'
      }
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<a id="logout-button">Log Out</a>')
    $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location = './index.html')
    })
  })
  }
})
  $('#login').click(function(e){
            window.location = '/login'
          })
})
