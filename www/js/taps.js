// JavaScript Document
var taps = {
init: function(){
	  var occlist = document.querySelector("#alloccasions");
var mc = new Hammer.Manager(occlist);
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
		{    /**************
    Or the really long labourious difficult confusing annoying wasting time way....
    for(var i=0; i< document.querySelectorAll("#list option").length; i++){
      if(document.querySelectorAll("#list option")[i].value == item){
        document.querySelectorAll("#list option")[i].setAttribute("selected", "selected");
      }else{
        document.querySelectorAll("#list option")[i].removeAttribute("selected");
      }
    }
    ****************/
			alert("single tap"); 
			//document.querySelector("[data-role=modal] h3").innerHTML = "Editing " + itemVal;  
		} else if (ev.type == "doubletap")
		{
			alert("double"); 
			
		} else {
			return; 
		}
	});
  }
}