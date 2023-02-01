({
	fetchAcc : function(component, event, helper) {
        helper.fetchAccHelper(null,component);
		
	},
    //Using Search
    searchContact : function(component, event, helper) {
         // debugger;
        var searchValue = component.find("searchField").get("v.value");
       // console.log("User "+searchValue)
       helper.fetchAccHelper(searchValue,component);		
	}
   
})