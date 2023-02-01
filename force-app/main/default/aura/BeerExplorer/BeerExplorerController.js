({
    handleCompEvent : function(component, event, helper) {
        var searchParam = event.getParam('searchText');
        var action = component.get('c.searchBeer');
        action.setParams({
            searchParam : searchParam
        });
        action.setCallback(this,function(response){
            var state = response.getState(response);
            if(state === 'SUCCESS'){
                var responseValue = response.getReturnValue();
                console.log(responseValue);
                component.set('v.beerList',responseValue)
            }else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})