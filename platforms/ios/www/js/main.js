// this file will contain a combination of the code snippets needed to do the project. 

// display the contact from localStorage 
var contactsJSON = []; 
var selectOption;
var loadCount = 0;
document.addEventListener("DOMContentLoaded", prep);
document.addEventListener("deviceready", prep);
function prep(){
	loadCount++;
	if (loadCount == 2){
		start();
	}
}
function start(){
// get contacts -- load 12 contacts into JSON object 
getContacts();  // the app.init is in the getContacts after the contact items have loaded 
}

var app = {
  init: function(){
	  var list = document.querySelector("#list");
var mc = new Hammer.Manager(list);
	// Tap recognizer with minimal 2 taps
	mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
	// Single tap recognizer
	mc.add( new Hammer.Tap({ event: 'singletap' }) );
	// we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
	mc.get('doubletap').recognizeWith('singletap');
	// we only want to trigger a tap, when we don't have detected a doubletap
	mc.get('singletap').requireFailure('doubletap');
	mc.on("singletap doubletap", function(ev) {
		if (ev.type == "singletap")
		{
			document.querySelector("#home").style.display="none";
			document.querySelector("#divmap").style.display="none";
			document.querySelector("[data-role=modal]").style.display="block";
			document.querySelector("[data-role=overlay]").style.display="block";
			//ev.stopPropagation();
			//alert("tapping works"); 
			// We create a manager object, which is the same as Hammer(), but without the presetted recognizers. 
			document.querySelector("[data-role=modal]").style.display="block";
			document.querySelector("[data-role=overlay]").style.display="block";
			//app.edit(ev);
			var item = ev.target.getAttribute("data-ref");
			var itemVal = ev.target.innerHTML;
			document.getElementById("list").value = item;
			showModal(item); 
    /**************
    Or the really long labourious difficult confusing annoying wasting time way....
    for(var i=0; i< document.querySelectorAll("#list option").length; i++){
      if(document.querySelectorAll("#list option")[i].value == item){
        document.querySelectorAll("#list option")[i].setAttribute("selected", "selected");
      }else{
        document.querySelectorAll("#list option")[i].removeAttribute("selected");
      }
    }
    ****************/
			document.querySelector("[data-role=modal] h3").innerHTML = "Editing " + itemVal;  
		} else if (ev.type == "doubletap")
		{
			document.querySelector("#home").style.display="none";
			document.querySelector("[data-role=modal]").style.display="none";
			document.querySelector("[data-role=overlay]").style.display="none";
			document.querySelector("#divmap").style.display="block";
			initializeMap(); 
		} else {
			return; 
		}
	});
    
  },
  cancel: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
  },
  save: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
  },
  edit: function(ev){
	    ev.stopPropagation();
    //alert("tapping works"); 
	// We create a manager object, which is the same as Hammer(), but without the presetted recognizers. 
    document.querySelector("[data-role=modal]").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
    
    var item = ev.target.getAttribute("data-ref");
    var itemVal = ev.target.innerHTML;
    document.getElementById("list").value = item;
	showModal(item); 
    /**************
    Or the really long labourious difficult confusing annoying wasting time way....
    for(var i=0; i< document.querySelectorAll("#list option").length; i++){
      if(document.querySelectorAll("#list option")[i].value == item){
        document.querySelectorAll("#list option")[i].setAttribute("selected", "selected");
      }else{
        document.querySelectorAll("#list option")[i].removeAttribute("selected");
      }
    }
    ****************/
    
    document.querySelector("[data-role=modal] h3").innerHTML = "Editing " + itemVal; 
  }
}

function showModal(item){
	
	// get the contact id of the person 
	// display the phone numbers for that contact id 
	// from localStorage 
	var modalRole = document.querySelector("[data-role=modal]");
	var modal = document.getElementById("modal");
	var h3 = document.createElement("h3"); 
	var divInput = document.getElementById("divinput"); 
	//id : count
	//displayName : matches[count].displayName, 
	//phoneNumber : matches[count].phoneNumbers[number].value, 
	//numberType : matches[count].phoneNumbers[number].type});
	//input.value = 
	//p.innerHTML = "hi"; 
	modalRole.appendChild(h3); 
	name.type = "text";
	name.value = contactsJSON[item].displayName;
			divInput.appendChild(name); 
			//modal.appendChild(divInput);
	
	var phoneNumber = document.createElement("input"); 
	phoneNumber.type = "text"; 
	if (divInput.childNodes.length < 1)
	{
		for (var count = 0; count < contactsJSON[item].phoneNumbers.length; count++)
		{
			var phoneNumber = document.createElement("input");
			phoneNumber.type = "text"; 
			phoneNumber.value = contactsJSON[item].phoneNumbers[count].value;
			divInput.appendChild(phoneNumber); 
			
		}
		modalRole.appendChild(divInput);
	} else 
	{
		phoneNumber.value = ""; 
		divInput.removeChild(phoneNumber); 
		modalRole.removeChild(divInput); 
	}
	
	/*
	 if (divInput.childNodes.length == 0)
	 {
			
			//alert(contactsJSON[item].displayName);
			input.value = contactsJSON[item].displayName;
			divInput.appendChild(input); 
			modal.appendChild(divInput);
	 }
	else{
		
			//alert(contactsJSON[item].displayName);
			input.value = "";
		var remove = divInput.childNodes.length;
		var removeThis = 0;
		while (removeThis < divInput.childNodes.length)
		{
			divInput.removeChild(removeThis); 
			removeThis++;
		}
	}
	*/
}

// hides everything and goes back to main page 
function goback(){
	document.querySelector("#home").style.display="block";
	document.querySelector("#divmap").style.display="none";
	document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
}
