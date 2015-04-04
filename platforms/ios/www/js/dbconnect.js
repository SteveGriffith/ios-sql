
var app ={
  db:null,
  version:'1.0'
};

document.addEventListener("DOMContentLoaded", function(){
  //app has loaded
  //access / create the database
  checkDB();
  
  document.getElementById("btnAdd").addEventListener("click", addThing);
});
document.addEventListener("deviceready", function(){
  //app has loaded
  //access / create the database
  checkDB();
  
  document.getElementById("btnAdd").addEventListener("click", addThing);
});

function output(msg){
  document.getElementById("output").innerHTML += "<br/>" + msg;
}

function checkDB(){
		app.db = openDatabase('sample', '', 'Sample DB', 1024*1024);
    if(app.version == ''){
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
                    /*
					trans.executeSql('INSERT INTO stuff(name) VALUES(?)', ["Cheese"], 
                                    function(tx, rs){
                                        //do something if it works, as desired   
                                        output("Added row in stuff");
                                    },
                                    function(tx, err){
                                        //failed to run query
                                        output( err.message);
                                    });
					*/
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
    }else{
        //version should be 1.0
        //this won't be the first time running the app
        output("DB has previously been created");
        output('Version:' + app.version)   ;
    }
	  updateList();
}

function addThing(ev){
  ev.preventDefault();
  alert("it works");
   
  //var txt = document.getElementById("txt").value;
  /*
  if(txt != ""){
    //save the value in the stuff table
    
	app.db.transaction(function(trans){
    	trans.executeSql('INSERT INTO stuff(name) VALUES(?)', [txt], 
                                    function(tx, rs){
                                        //do something if it works, as desired   
                                        output("Added row in stuff");
																	      updateList();
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
	
  }else{
    output("Text field is empty");
  }
  */
}

function updateList(){
  var list = document.getElementById("list");
  list.innerHTML = "";
  //clear out the list before displaying everything
  app.db.transaction(function(trans){
    trans.executeSql("SELECT * FROM stuff", [], 
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
      output("displayed the current contents of the stuff table")
    	}, 
      function(tx, err){
      	//error
      	output("transaction to list contents of stuff failed")
    });
  });
}