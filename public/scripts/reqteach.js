$(document).ready(function(){
  $('#logout-button').click(function(e){
    $.post('/logout').then((data)=> window.location = './index.html')
  })
  $('#send').click(function(e){
    e.preventDefault()
    $.post('/reqteacher', {message: $('#message').val()})
    .then( function(data){
      alert('An e-mail has been sent to the site administrator requesting teacher access for you')
      window.location =  '/index.html'
    })
  })
})
