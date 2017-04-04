$(document).ready(function(){
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<a id="logout-button">Log Out</a>')
    $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location= '/')
    })
    $.get('/author').then((data)=>{
      var authors = data
      authors.forEach(function(el, ind, arr){
        var $author = $('<li class="author '+el.id+'">')
        $author.append('<a href="/author.html?id='+el.id+'">'+el.firstname+' '+el.lastname+'</a>')
        $('.authors').append($author.clone())
      })
      if ($('.author').length > 2){
        var $pagesli = $('<li>')
        var pages = Math.ceil(($('.author').length /2))
        console.log(pages)
        for (var i = pages; i > 0; i--){
          var $pagelink = $('<a class="page" value='+i+'>Page: '+i+'</a>')
          $pagesli.prepend($pagelink)
        }
        $('.authors').prepend($pagesli)
        $('.page').click(function(e){
          var p = $(this).attr('value')
          var stuff = p * 2
          var minimum = stuff - 2
          $('.author').each(function(ind, el){
            console.log(ind, el)
            if ($(el).index('.author')+ 1 > minimum && $(el).index('.author') < stuff ){
            $(el).show()
          } else {
            $(el).hide()
          }
        })
        })
        $('.author').each(function(ind, el){
          console.log(ind, el)
          if ($(el).index('.author') > 1){
          $(el).hide()
        }
        })
      }
      $('.authors').append('<p>Total Authors: '+authors.length+'</p>')
    })
  }
})
})
