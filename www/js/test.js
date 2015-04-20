function output(msg){
  console.log(msg);
}

var app= {
	 db:null,
	 version:'1.0',
	loadRequirements:0,
	init: function(){
		document.addEventListener("deviceready", app.onDeviceReady);
		document.addEventListener("DOMContentLoaded", app.onDomReady);
	},
	onDeviceReady: function(){
		app.loadRequirements++;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	onDomReady: function(){
		app.loadRequirements++;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	start: function(){
		//connect to database
		//build the lists for the main pages based on data
		//add button and navigation listeners
		document.addEventListener("DOMContentLoaded", function(){
			//app has loaded
			//access / create the database
			checkDB();
		document.getElementById("addperson").addEventListener("click", addThing);
		 
		});
		document.addEventListener("deviceready", function(){
			//app has loaded
			//access / create the database
			 
			showPeople(); 
		document.getElementById("addperson").addEventListener("click", modalAddPersonClicks);
		
		showOccasions();
		document.getElementById("addocc").addEventListener("click", modalAddOccasionClicks);
			//document.getElementById("goccasion-list").style.display = document.getElementById("gifts-for-occasion").style.display = document.getElementById("gifts-for-person").style.display = "none";
		
		});
	}
}

function showModal(modal)
{
	if (modal == "people")
	{
		  document.getElementById("modalcancelperson").addEventListener("click", modalCancelPerson);
		  document.getElementById("modalsaveperson").addEventListener("click", modalAddPerson);
		  document.getElementById("add-person").style.display = "block"; 

	} else if (modal == "occasions")
	{
		  document.getElementById("modalcancelocc").addEventListener("click", modalCancelOccasion);
		  document.getElementById("modalsaveocc").addEventListener("click", modalAddOccasion);
		  document.getElementById("add-occ").style.display = "block"; 
	}
}


app.init();


