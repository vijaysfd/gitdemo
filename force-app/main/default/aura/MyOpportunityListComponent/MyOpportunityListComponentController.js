({
	doInit : function(component, event, helper) {
        
        helper.fetchOppHelper(null,component);	
        let tempJson = [{Name:"Manoj",Amount:'6000',StageName:'Testing'}];
        //component.set('v.lstOpportunity',tempJson);
	},
    //Using Search
    searchOpportunities : function(component, event, helper) {
        var searchValue = component.find("searchField").get("v.value");
    //    console.log("User "+searchValue)
        helper.fetchOppHelper(searchValue,component);		
	}
})