var contactsJSON = [];
function output(msg){
  console.log(msg);
}

function checkDB(){
		app.db = openDatabase('sample', '', 'Sample DB', 1024*1024);
		
    //if(app.version == ''){
        output('First time running... create tables'); 
        //means first time creation of DB
        //increment the version and create the tables
        app.db.changeVersion('', app.version,
                function(trans){
                    //something to do in addition to incrementing the value
                    //otherwise your new version will be an empty DB
                    output("DB version incremented");
                    //do the initial setup
          					//create some table(s)
          					//add stuff into table(s)
						/*
							people
							person_id integer
							person_name varchar
							 
							
							occasions
							occ_id integer
							occ_name varchar
							 
							
							gifts
							gift_id integer
							person_id integer
							occ_id integer
							gift_idea varchar
							purchased boolean
							*/ 
					var createPeople = 'CREATE TABLE people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name VARCHAR)';
					var createOccasions = 'CREATE TABLE occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name VARCHAR)'
					var createGifts = 'CREATE TABLE gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea VARCHAR, purchased BOOLEAN)';
					
					trans.executeSql(createPeople, [], 
                                    function(tx, rs){
                                        //do something if it works
                                        output("People Created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
									
					trans.executeSql(createOccasions, [], 
                                    function(tx, rs){
                                        //do something if it works
                                        output("Occasions Created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
									
					trans.executeSql(createGifts, [], 
                                    function(tx, rs){
                                        //do something if it works
                                        output("Gifts Created");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
                    // Get some contacts
					getContacts();
					
					// Use the array list of contacts and add them to the PEOPLE table
					for (var i = 0; i < contactsJSON.length; i++)
					{
						trans.executeSql('INSERT INTO PEOPLE(person_id, person_name) VALUES(' + i + ',' + contactsJSON[i].name + ')', 
						function(tx, rs){
                                        //do something if it works, as desired   
                                        output("Added row in stuff");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
					}
                                    
					
                },
                function(err){
                    //error in changing version
                    //if the increment fails
                    output( "Change version call error " + err.message);
                },
                function(){
                    //successfully completed the transaction of incrementing the version number   
          					output("Change version function worked.")
                });
   /*
    }else{
        //version should be 1.0
        //this won't be the first time running the app
        output("DB has previously been created");
        output('Version:' + app.version)   ;
    }
	*/
	  updateList();
}

function addThing(ev){
  ev.preventDefault();
  alert("it works");
    
  var txt = document.getElementById("txt").value;
  
  if(txt != ""){
    //save the value in the stuff table
    
	app.db.transaction(function(trans){
		alert("trying to insert something"); 
    	/*trans.executeSql('INSERT INTO stuff(name) VALUES(?)', [txt], 
                                    function(tx, rs){
                                        //do something if it works, as desired   
                                        output("Added row in stuff");
																	      updateList();
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
		*/
    },
    function(){
      //error for the transaction
      output("The insert sql transaction failed.")
    },
    function(){
      //success for the transation
      //this function is optional
    });
	
  }else{
    output("Text field is empty");
  }
  
}

function updateList(){
  //var list = document.getElementById("listview");
  var list = document.createElement("ul"); 
  //list.innerHTML = "";
  //clear out the list before displaying everything
  //alert("updating list"); 
  app.db.transaction(function(trans){
    trans.executeSql("SELECT * FROM people", [], 
    	function(tx, rs){
      	//success
      	//rs.rows.item(0).name would be the contents of the first row, name column
      	//rs.rows.length is the number of rows in the recordset
      	var numStuff = rs.rows.length;
      	for(var i=0; i<numStuff; i++){
          var li = document.createElement("li");
          li.innerHTML = rs.rows.item(i).name;
          list.appendChild(li);
        }
		//alert(document.getElementById("peoplegifts"));
		document.getElementById("peoplegifts").appendChild(list); 
      output("displayed the current contents of the stuff table")
    	}, 
      function(tx, err){
      	//error
      	output("transaction to list contents of stuff failed")
    });
  });
}

function getContacts(){
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
						navigator.contacts.find(filter, addContacts, searchError, options);
					}
}
function addContacts(matches){
					var maxContacts = 12; 
					for (var count = 0; count < maxContacts; count++)
					{ 
							contactsJSON.push({id : count, displayName : matches[count].displayName});
							alert(contactsJSON[count].displayName); 
					}
					//contacts.appendChild(ul);
}

function searchError(){
	
	console.log("there was an error");
}