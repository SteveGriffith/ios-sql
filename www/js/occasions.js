// Description:
// This script deals with:
// the "Occasions" webpage, 
// the "Add Occasions" modal, 
// and adding occasions into the "occasions" data table. 
function sqlInsertOccasions(value){
	app.db = openDatabase('sample', '', 'Sample DB', 1024*1024);
    //save the value in the stuff table
	app.db.transaction(function(trans){
		alert("trying to occasions"); 
    	trans.executeSql('INSERT INTO occasions(occ_name) VALUES("' + value + '")', [],
						function(tx, rs){
								//do something if it works, as desired   
								output("Added a occasion");
								showOccasions(); 
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
function modalAddOccasionClicks(ev){
  ev.preventDefault();
  showModal("occasions");

}

function modalAddOccasion(ev){
	var input = document.getElementById("new-occ").value;
	sqlInsertOccasions(input);
	input.value = ""; // clear after insert 
	document.getElementById("add-occ").style.display = "none"; 
	
}

function modalCancelOccasion(ev){
	document.getElementById("add-occ").style.display = "none";
	document.getElementById("new-occ").value = "";
}

function showOccasions(){
  //var list = document.getElementById("listview");
  document.getElementById("alloccasions").innerHTML = ""; 
  var list = document.createElement("ul"); 
  //list.innerHTML = "";
  //clear out the list before displaying everything
  //alert("updating list");
  app.db = openDatabase('sample', '', 'Sample DB', 1024*1024);
    //save the value in the stuff table
app.db.transaction(function(trans){
    trans.executeSql("SELECT * FROM occasions", [],function(tx, rs){
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
			  li.innerHTML = row["occ_name"];
			  list.appendChild(li);
			}
			document.getElementById("alloccasions").appendChild(list); 
		  output("displayed the current contents of the occasions table");
    	}, function(tx, err)
		{
      	//error
			output("transaction to list contents of stuff failed");
		});
  });
}