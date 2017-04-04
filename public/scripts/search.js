$(document).ready(function(){
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $.get('/isteacher').always((data)=>{
      if (data == "true"){
        console.log('hi teacher')
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
  var to
  $('#type').on('change', function(e){
    $('#search').keyup()
  })
  $('#search').keyup(function(e){
    if ($('#search').val().length < 1){
      $('.results').empty()
      return
    }
    if (!!to){
    clearTimeout(to)}
    to = setTimeout(function(){
      $.post('/search'+$('#type').val(), {searchterm: $('#search').val()}).then(function(data){
        $('.results').empty()
        console.log(data)
        data[0].forEach(function(el, ind, arr){
          var $book = $('<li class="'+el.id+'">')
          $book.append('<a href="/book.html?id='+el.id+'">'+el.name+'</a>')
          $('.results').append($book.clone())
      })
      data[1].forEach(function(el, ind, arr){
        var $author = $('<li class="'+el.id+'">')
        $author.append('<a href="/author.html?id='+el.id+'">' +el.firstname+' '+ el.lastname+'</a>')
        $('.results').append($author.clone())
    })
    }, 500)
  })
})
})
