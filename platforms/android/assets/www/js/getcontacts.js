var maxContacts = 12; 
function getContacts(){
	// if there are no contacts, ask the user to create one
	if (!navigator.contacts){
		var p = navigator.contacts.create(); 
		p.firstName = "Steve"; 
		p.save(); 
		if (navigator.contacts)
		alert("it works");
	
		var myContact = navigator.contacts.create({"displayName": "Test User"});
        myContact.note = "This contact has a note.";
        alert("The contact, " + myContact.displayName + ", note: " + myContact.note); 
		
	}
	else
	{
		var options = new ContactFindOptions( );
		options.filter = "";  //leaving this empty will find return all contacts
		options.multiple = true;  //return multiple results
		var filter = ["displayName"];    //an array of fields to compare against the options.filter 
		console.log("finding a contact");
		navigator.contacts.find(filter, showContacts, searchError, options);
		
		
	}
}

function showContacts(matches){
	
	
	var contacts = document.getElementById("showcontacts");

	var ul = document.createElement("ul"); 
	ul.setAttribute("data-role", "listview"); 
	ul.id = "list"; 
	var li; 
	for (var count = 0; count < maxContacts; count++)
	{ 
			li = document.createElement("li"); 
			li.setAttribute("data-ref", count); 
			//li.id = count; 
			li.innerHTML = matches[count].displayName; 
			//li.innerHTML = matches[randomid].phoneNumbers[count].value + " (" + matches[randomid].phoneNumbers[count].type + ")"; 
			ul.appendChild(li);
			//matches[randomid].phoneNumbers[count].value
			contactsJSON.push({id : count, displayName : matches[count].displayName, phoneNumber : matches[count].phoneNumbers[0].value, numberType : matches[count].phoneNumbers[0].type});
			
	}
	contacts.appendChild(ul);

	app.init(); 
	localStorage.clear();
	//localStorage.setItem("ioud0001-interactions", contactsJSON); // send array values to localStorage
}

function searchError(){
	
	console.log("there was an error");
}