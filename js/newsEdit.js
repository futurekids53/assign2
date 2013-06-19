$(function() {
    $( "#datepicker" ).datepicker();
 });

Parse.initialize("kc3NvzE6o7SOUiMq5cO6i9z8JdZK2PhLphs40S6W", "b7bYbBATk7eX9GSo3UjqesG0zx0HCQEHayW7DoyJ");


var Title = Parse.Object.extend("Xnews");


var saveFunc = function(){

  var title = new Title();
  var num = parseInt($("#title").val(),10);
  title.set("title", num);
  title.save(null, {
    success: function(object) {
        alert("object saved!");
        queryFunc();
    },
    error: function(error) {
        alert("Uh oh :( ");
    }
  });  
};

var removeCell = function(){
  var oid = this.id;
  
  this.remove();
  
  var del = new Parse.Query(title);
  del.get(oid, {
    success: function (delObj){
      delObj.destroy();
      
    },
    error: function (object, error){
      alert("error");
    }
    
  });
  
};

var queryFunc = function(){

  $("#data").empty();
  $("#data").append("<tr><th>title</th></tr>");

  var query = new Parse.Query(title);
  //query.lessThan("title", 10);  
  
  var collection = query.collection();
  collection.fetch({
  success: function(collection) {
    collection.each(function(object) {
      //console.log(object.id);
      $("#data").append("<tr id="+object.id+"><td>"+
                        object.get("title")+
                        "</td></tr>");
      
      $("#"+object.id).on("click", removeCell);
      
    });
  },
  error: function(collection, error) {
    // The collection could not be retrieved.
    }
  });
  
};



$("#save").on ("click",saveFunc);
$("#query").on ("click", queryFunc);



