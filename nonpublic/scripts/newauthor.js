$(document).ready(function(){
  $('#logout-button').click(function(e){
    $.post('/logout').then((data)=> window.location.reload())
  })
$('#send').click(function(e){
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/author',
    data: {
      firstname: $('#firstname').val(),
      lastname: $('#lastname').val(),
      bio: $('#bio').val(),
      portrait: $('#portrait').val()
    }
  }).done(function(data){
    console.log(data)
    window.location = './editauthors.html'
  }).catch(function(){
    alert('Please enter a first name and last name')
  })
})
})
