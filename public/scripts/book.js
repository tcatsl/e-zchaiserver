$(document).ready(function(){
  const urlArr = window.location.href.split('=')
const book_id = urlArr[1]
var teacher = false
  console.log(book_id)
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $.get('/isteacher').always((data)=>{
      if (data == "true"){
        teacher = true
      }
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<a id="logout-button">Log Out</a>')
    $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location= '/')
    })
    $.get('/book/'+book_id).then((data)=>{
      console.log(data)
      var book = data[0]
        $('#title').text(book.name)
        $('#cover').attr('src', book.cover)
        $('#genre').text(book.genre)
        $('#descr').text(book.description)
        if (teacher == true){
          $('.info-cont').append('<button id="edit">Edit</button>')
          $('.info-cont').append('<button id="delete">Delete</button>')
          $('#delete').click(function(e){
            $.ajax({
              url: '/book/'+book_id,
              type: 'DELETE'
            }).done(function(data){
              window.location = './books.html'
            })
          })
          $('#edit').click(function(e){window.location = '/editbook.html?id='+book_id})
        }
        var $authors = $('<p>')
        $.get('/book/authors/'+book_id).then(function(authors){
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

            $('#authors').append($authors.clone())
        })
    })
  })
  }
})
})
