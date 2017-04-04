$(document).ready(function(){
  const urlArr = window.location.href.split('=')
const author_id = urlArr[1]
var teacher = false
  console.log(author_id)
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
    $.get('/author/'+author_id).then((data)=>{
      console.log(data)
      var author = data[0]
        $('#name').text(author.firstname + ' ' + author.lastname)
        $('#portrait').attr('src', author.portrait)
        $('#bio').text(author.bio)
        var $books = $('<ul>')
        $.get('/author/books/'+author_id).then(function(books){
          $books = $('<ul>')
          books.forEach(function(el, ind, arr){
            var $book = $('<li class="'+el.id+'">')
            $book.append('<a href="/book.html?id='+el.id+'">'+el.name+'</a>')
            $books.append($book.clone())
        })
        $('#books').append($books)
        if (teacher == true){
          $('.info-cont').append('<button id="delete">Delete</button>')
          $('#delete').click(function(e){
            $.ajax({
              url: '/author/'+author_id,
              type: 'DELETE'
            }).done(function(data){
              window.location = './authors.html'
            })
          })
          $('.info-cont').append('<button id="edit">Edit</button>')
          $('#edit').click(function(e){window.location = '/editauthor.html?id='+author_id})
        }
    })
  })
})
}
})
})
