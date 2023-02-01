({
	locationchange : function(component, event, helper) {
  		//console.log("Line 3" + JSON.stringify(event));      
        var token = event.getParam("token");
        console.log("Line 3" + JSON.stringify(event)); 
        if(token){
        if(token.indexOf('contact/')===0){
            var contactID = token.substr(token.indexOf('/')+1);
            var action = component.get("c.ContactFindbyID");
            action.setParams({"contactID":contactID});
            action.setCallback(this,function(a){
                component.set("v.contact",a.getReturnValue()) ; 
            });
          $A.enqueueAction(action);  
        }
        }
	}
})