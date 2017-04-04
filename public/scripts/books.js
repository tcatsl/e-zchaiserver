$(document).ready(function(){
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<a id="logout-button">Log Out</a>')
    $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location= './index.html')
    })
    $.get('/book/genre').then(function(genres){
      genres.forEach((genre, index, list)=>{
        $('.genres').append('<button id="'+genre.genre+'" class="dropdown-item" type="button">'+genre.genre+'</button>')
      $('#'+genre.genre).click(function(e){
        // e.preventDefault()
        $('.book').hide()
        $('.'+genre.genre).show()
      })
    })
      $('#all').click(function(e){
        // e.preventDefault()
        $('.book').show()
      })
    })
    // <button class="dropdown-item" type="button">Action</button>
    $.get('/book').then((data)=>{
      var books = data
      data.forEach(function(el, ind, arr){
        var $book = $('<li class="'+el.id+' '+el.genre+' '+'book">')
        $book.append('<a href="/book.html?id='+el.id+'">'+el.name+'</a>')
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
      $('.books').append('<p>Total Books: '+books.length+'</p>')
      if ($('.book').length > 2){
        var $pagesli = $('<li>')
        var pages = Math.ceil(($('.book').length /10))
        console.log(pages)
        for (var i = pages; i > 0; i--){
          var $pagelink = $('<a class="page" value='+i+'>Page: '+i+'</a>')
          $pagesli.prepend($pagelink)
        }
        $('.books').prepend($pagesli)
        $('.page').click(function(e){
          var p = $(this).attr('value')
          var stuff = p * 10
          var minimum = stuff - 10
          $('.book').each(function(ind, el){
            console.log(ind, el)
            if ($(el).index('.book')+ 1 > minimum && $(el).index('.book') < stuff ){
            $(el).show()
          } else {
            $(el).hide()
          }
        })
        })
      }
      $('.book').each(function(ind, el){
        console.log(ind, el)
        if ($(el).index('.book') > 9){
        $(el).hide()
      }
      })
    })
  }
})
})
