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
    $.get('/book').then((data)=>{
      var books = data
      data.forEach(function(el, ind, arr){
        var $book = $('<li class="'+el.id+'">')
        $book.append('<a href="/editbook.html?id='+el.id+'">'+el.name+'</a>')
        $('.books').append($book.clone())
        var $authors = $('<p>')
        $.get('/book/authors/'+el.id).then(function(authors){
          console.log(authors)
            var num = authors.length
            authors.forEach(function(element, index, array){
              console.log(element.id)
              var curr = $authors.html()
              if (index == 0){
              $authors.html('by ' +'<a href="/author.html?id='+element.id+'">' +element.firstname+' '+ element.lastname+'</a>')
            } else {
                $authors.html(curr+ ' & <a href="/author.html?id='+element.id+'">' +element.firstname+' '+ element.lastname +'</a>')
            }
            })
            $('.'+el.id).append($authors.clone())
        })
      })
    })
  }
})
})
