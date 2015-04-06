// Description:
// This script deals with:
// the "People" webpage, 
// the "People" modal, 
// and adding people into the "people" data table. 
function sqlInsertPeople(value){
	app.db = openDatabase('sample', '', 'Sample DB', 1024*1024);
    //save the value in the stuff table
	app.db.transaction(function(trans){
		alert("trying to insert something"); 
    	trans.executeSql('INSERT INTO people(person_name) VALUES("' + value + '")', [],
						function(tx, rs){
								//do something if it works, as desired   
								output("Added a person");
								showPeople(); 
						},
						function(tx, err){
								//failed to run query
								output( err.message);
						});	
						
	},
    function(){
      //error for the transaction
      output("The insert sql transaction failed.")
    },
    function(){
      //success for the transation
      //this function is optional
    });

}
function modalAddPersonClicks(ev){
  ev.preventDefault();
	showModal("people"); 
}

function modalAddPerson(ev){
		var input = document.getElementById("new-per").value;
		  sqlInsertPeople(input);
		  document.getElementById("add-person").style.display = "none"; 
	
}

function modalCancelPerson(ev){
	document.getElementById("add-person").style.display = "none";
}

function showPeople(){
  //var list = document.getElementById("listview");
  var list = document.createElement("ul"); 
  //list.innerHTML = "";
  //clear out the list before displaying everything
  //alert("updating list");
  app.db = openDatabase('sample', '', 'Sample DB', 1024*1024);
  alert(app.db);
    //save the value in the stuff table
app.db.transaction(function(trans){
    trans.executeSql("SELECT * FROM people", [],function(tx, rs){
			//success
			//rs.rows.item(0).name would be the contents of the first row, name column
			//rs.rows.length is the number of rows in the recordset
			var numStuff = rs.rows.length;
			alert(numStuff); 
			for(var i=0; i<numStuff; i++){
			  var li = document.createElement("li");
			  //li.innerHTML = rs.rows.item(i).name;
			  //li.innerHTML = rs.rows[i]["name"];
			  var row = rs.rows.item(i); 
			  li.innerHTML = row["person_name"];
			  //li.setAttribute("", );  
			  list.appendChild(li);
			}
			document.getElementById("allfriends").appendChild(list); 
		  output("displayed the current contents of the stuff table")
    	}, function(tx, err)
		{
      	//error
			output("transaction to list contents of stuff failed")
		});
  });
}