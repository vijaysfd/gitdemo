({
	handleChild : function(component, event, helper) {
		var params = event.getParam('arguments');
        if(params){
            var param1 = params.param1;
            alert("In Child Controller"+param1);
        }
	}
})