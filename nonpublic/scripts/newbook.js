$(document).ready(function(){
  const urlArr = window.location.href.split('=')
const book_id = urlArr[1]

  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<button id="logoutbutton">Log Out</button>')
    // $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location= '/')
    })
    // $.get('/book/'+book_id).then((data1)=>{
    //   console.log(data1)
    //   var book = data1[0]
    //     $('#title').val(book.name)
    //     $('#genre').val(book.genre)
    //     $('#showcov').attr('src', book.cover)
    //     $('#cover').val(book.cover)
    //     $('#descr').text(book.description)
        $.get('/author').then((authors)=>{
          authors.forEach(function(auth, ind, auths){
            var $option = $('<option>')
            $option.addClass(auth.id.toString())
            $option.val(auth.id)
            $option.text(auth.firstname + ' '+ auth.lastname)
            $('#newauth').append($option)
          })
        })
        $('#newauth').on('change', function(e){
          var $author = $('<li>')
          $author.addClass('auth')
          $author.val($('#newauth').val())
          $author.append('<p>'+$('.'+$('#newauth').val()).text()+'<button class="remove">Remove</button></p>')
          $('#authors').append($author.clone())

          $('.remove').click(function(e){
            e.preventDefault()
            $(this).parent().parent().remove()
          })
        })
        $('#send').click(function(e){
          e.preventDefault()
          $.post('/book', {name: $('#title').val(), cover: $('#cover').val(), description: $('#descr').val(), genre: $('#genre').val()}).then(function (data){
            console.log(data)
            var id = data[0]
            var len = $('.auth').length
            var authorss = []
            for (var i = 0; i < len; i++){
              authorss.push($('.auth')[i].value)
            }
            console.log(authorss)
            var count = 0
            var target = authorss.length
            authorss.forEach(function(num){
              $.post('/author_book', {'author_id': num, 'book_id': id})
            .then(function(data){
              count++
              console.log(data)
              if (count ==target){
                alert('new book added to database!')
                window.location = '/book.html?id='+id
              }
            })
          })
        }).catch(function(){
          alert('Please enter a title')
        })
      })
      }
    })
  })
