$(document).ready(function(){
  const urlArr = window.location.href.split('=')
const book_id = urlArr[1]

  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $('.info-cont').append('<button id="delete">Delete</button>')
    $('#delete').click(function(e){
      $.ajax({
        url: '/book/'+book_id,
        type: 'DELETE'
      }).done(function(data){
        window.location = './books.html'
      })
    })
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<button id="logoutbutton">Log Out</button>')
    // $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location= '/')
    })
    $.get('/book/'+book_id).then((data1)=>{
      console.log(data1)
      var book = data1[0]
        $('#title').val(book.name)
        $('#genre').val(book.genre)
        $('#showcov').attr('src', book.cover)
        $('#cover').val(book.cover)
        $('#descr').text(book.description)
        $.get('/author').then((authors)=>{
          authors.forEach(function(auth, ind, auths){
            var $option = $('<option>')
            $option.val(auth.id)
            $option.text(auth.firstname + ' '+ auth.lastname)
            $('#newauth').append($option)
          })
        })
        $('#send').click(function(e){
          e.preventDefault()
          $.ajax({
            type: 'PUT',
            url: '/book/'+book_id,
            data: {
              name: $('#title').val(),
              genre: $('#genre').val(),
              description: $('#descr').val(),
              cover: $('#cover').val()
            }
          }).done(function(data){
            console.log(data)
            window.location ='./book.html?id='+book_id
          }).catch(function(){
            alert('Please enter a title')
          })
          })
        $('#newauth').on('change', function(e){
          $.post('/author_book', { 'book_id': book_id, 'author_id': $('#newauth').val()}).then(function(data){
            getAuths()
          })
        })
        function getAuths(){
          $('.auth').remove()
        $.get('/book/authors/'+book_id).then((data2)=>{
          console.log(data2)
          data2.forEach(function(el, ind, arr){
            var $author = $('<li>')
            $author.addClass('auth')
            $author.val(el.join.toString())
            $author.append('<p>'+el.firstname+' '+el.lastname+'<button class="remove">Remove</button></p>')
            $('#authors').append($author.clone())
          })
          $('.remove').click(function(e){
            e.preventDefault()
            console.log($(this).parent().parent().val())
            $.ajax({
              type: 'DELETE',
              url: '/author_book/'+parseInt($(this).parent().parent().val())
            }).then(function(data){
              getAuths()
            })
          })
        })
      }
      getAuths()
          })
        }
    })
  })
