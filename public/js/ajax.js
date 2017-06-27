$(document).ready(function(){
	alert("Im fucking working over here!")
});
// references to html items in our DOM
// Document Object Model= DOM
// Navigate to file in terminal
// Type node index.js in terminal
// then open browser and type localhost:3000
// then it should open

var friends = $("#friends");
var nameIn = $("#name");
var ageIn = $("#age");
// Mustache functionality
var friendTemplate = "" + 
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" + 
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<button id='{{id}}' class='remove'>X</button>" +
	"</li>";
	//Takes data from DOM and fills it into the string
	//Add the friend to the DOM
	function addFriend(friend){
		//Appends the friend to the end of the list usisng the tmeplate above
		friends.append(Mustache.render(friendTemplate, friend));
	}
$(document).ready(function(){
	// to load in all the friends on the api
	// This is where we going to populate page with friends already in API
	// application protocal interface
	$.ajax({
		type: "GET", 
		url: "http://rest.learncode.academy/api/learncode/friends",
		success: function(friends){
			//$.each is really just a built in jquery iterator
			$.each(friends, function(i, friend){
				addFriend(friend)
			});
		},
		error: function(){
			alert("Error loading friends");
		}
	});
	// Add friend functionality
	$("#add-friend").on("click", function(){
		//refrence DOM objects to fill out our friend object
		
		var friend = {
			name: nameIn.val(),
			age: ageIn.val()

		}
		//Postt the new friend to the api
		$.ajax({
			type: "POST", 
			url: "http://rest.learncode.academy/api/learncode/friends",
			data: friend,
			success: function(newFriend){
					addFriend(newFriend);
					//crud create remove update delete
			},
			error: function(){
				alert("Error adding friends");
			}
		});
	});
	// Deleting a friend functionality
	// Going to use delegate <--super smart tool for finding events that happen 
	friends.delegate(".remove", "click", function(){
		var $li = $(this).closest('li');
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});

});