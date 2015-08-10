chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		var how_long;
		var deadline = Number(localStorage.getItem('deadline'));
		var reason = localStorage.getItem('reason');

		function create_deadline(minutes_from_now){
			//set deadline to 
			deadline = 60 * 1000 * minutes_from_now + Date.now();
			localStorage.setItem('deadline',String(deadline))
		}

		function clear_deadline(){
			localStorage.setItem('deadline','')
		}

		function ask_intent(){
			reason = prompt("Why are you here?");
			localStorage.setItem('reason',reason);
			how_long = prompt("How many minutes do you need?");
			create_deadline(how_long);
			setTimeout(check_in, how_long * 60 * 1000);
		};

		function check_in(){

			//Fade out to get confrontational
			$('body').fadeOut('slow', function(){

				//If I agree it's time to stop
				if(confirm("Alright, you told me you were here because '" + reason + "' you're done now, right?")){
					clear_deadline();
					alert("Be the best you can be :)");
				} else {

					how_long = Number(prompt("How many more minutes do you need?"));
					create_deadline(how_long);
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


		//If I have no deadline set, require me to state my intent
		if(!deadline){
			ask_intent();

		//otherwise check if the deadline has passed
		}else{

			//If it has, check in
			if(deadline_passed()){
				check_in();
			//If deadline hasn't passed, make sure to check in when it does 
			}else{
				setTimeout(check_in, deadline - Date.now());
			};
		};
		// ----------------------------------------------------------

	}
	}, 10);
});