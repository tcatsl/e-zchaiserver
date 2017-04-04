$(document).ready(function(){
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<button id="logout-button">Log Out</button>')
    // $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location= '/')
    })
    $.get('/author').then((data)=>{
      var authors = data
      authors.forEach(function(el, ind, arr){
        var $author = $('<li class="'+el.id+'">')
        $author.append('<a href="/editauthor.html?id='+el.id+'">'+el.firstname+' '+el.lastname+'</a>')
        $('.authors').append($author.clone())

      })
    })
  }
})
})
