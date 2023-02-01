({
	showInfo : function(component, event, helper) {
      //  alert('Hello');
		var eventSource = 	event.getSource();
        var beerObj = eventSource.get('v.name');
        component.set('v.beerId',beerObj);
        $A.createComponent(
            "c:BeerDetails",
            {
                "beerId": beerObj  
            },
            function(beerDetails, status, errorMessage) {
                if(status === "SUCCESS"){
                    component.find('overLayLib').showCustomModal({
                        header: "Beer Details",
                        body:beerDetails,
                        showCloseButton: true,
                        cssClass: "mymodal",
                        closeCallback: function() {
                            
                        }
                        
                    });
                    
                }else if(status === "ERROR"){
                    alert(errorMessage);
                }    
            }
        );
	}
})