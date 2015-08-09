$(document).ready(function(){ //Encapsulate so as not to mess with other js variables

var reason, how_long, deadline;

function set_deadline(minutes_from_now){
	//set deadline to 
	deadline = 60 * 1000 * minutes_from_now + Date.now();
	localStorage.setItem('deadline',String(deadline))
}

function clear_deadline(){
	localStorage.setItem('deadline','')
}

function ask_intent(){
	reason = prompt("Why are you here?");
	how_long = prompt("How many minutes do you need?");
	set_deadline(how_long);
	setTimeout(check_in, how_long * 60 * 1000);
};

function check_in(){

	$('body').fadeOut('slow', function(){

		if(confirm("Alright, you told me you were here because '" + reason + "' you're done now, right?")){
			clear_deadline();
			alert("Be the best you can be :)");
		} else {

			how_long = Number(prompt("How many more minutes do you need?"));
			set_deadline(how_long);
			$('body').fadeIn('slow');
			setTimeout(check_in, how_long * 60 * 1000);

		};
	});
};

function deadline_passed(){
	if(Date.now() > deadline){
		return true;
	}else{
		return false;
	};
};

//Retrieve deadline if one was set
var deadline = Number(localStorage.getItem('browse_intent_deadline'));

//If I have no deadline set, require me to state my intent
if(!deadline){
	ask_intent();

//otherwise check if the deadline has passed
}else{

	//If it has, check in
	if(deadline_passed()){
		check_in();
	//If deadline hasn't passed, set a timer
	}else{
		setTimeout(check_in, how_long*60*1000);
	};
};



}); //encapsultion ends

