$(document).ready(function(){
  const urlArr = window.location.href.split('=')
const author_id = urlArr[1]

  console.log(author_id)
  $.get('/loggedin').then((data)=>{console.log(data)
  if(data !== 'false'){
    $('.info-cont').append('<button id="delete">Delete</button>')
    $('#delete').click(function(e){
      $.ajax({
        url: '/author/'+author_id,
        type: 'DELETE'
      }).done(function(data){
        window.location = './authors.html'
      })
    })
    $('#login').remove()
    var $logout = $('<li>').addClass('logout')
    $logout.append('<a><button id="logout-button">Log Out</button></a>')
    // $('.navbar-nav').append($logout)
    $('#logout-button').click(function(e){
      $.post('/logout').then((data)=> window.location= '/')
    })
    $.get('/author/'+author_id).then((data)=>{
      console.log(data)
      var author = data[0]
        $('#firstname').val(author.firstname)
        $('#lastname').val(author.lastname)
        $('#showport').attr('src', author.portrait)
        $('#portrait').val(author.portrait)
        $('#bio').text(author.bio)
        $('#send').click(function(e){
          e.preventDefault()
          $.ajax({
            type: 'PUT',
            url: '/author/'+author_id,
            data: {
              firstname: $('#firstname').val(),
              lastname: $('#lastname').val(),
              bio: $('#bio').val(),
              portrait: $('#portrait').val()
            }
          }).done(function(data){
            console.log(data)
            window.location ='./author.html?id='+book_id
          }).catch(function(){
            alert('Please enter a first name and last name')
          })
          })
        })
    }
  })
})
