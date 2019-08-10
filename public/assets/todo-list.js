//this file is going to control Ajax request
$(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()};
  
        //the function in todoController was made when Ajax request is made
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //reload the page(todo.ejs),new item will push into it
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });
  
  });