({
    doSave : function(component, event, helper) {
        
        var action = component.get('c.CreateContact');
        var contc =  component.get('v.createContact');
        /*
        if(contc.FirstName === null ||  contc.FirstName === ''  ){
            alert('Please enter First Name');
            return ;
        }
        */
          if($A.util.isEmpty(contc.FirstName)){
        	alert('Please enter First Name using util');
  		}
        /*
          if($A.util.isEmpty(component.find("AccountAsset").get("v.value"))){
        component.set("v.hasError", true);
  		}
         */
        action.setParams({
            con:component.get('v.createContact'),
            AccountId:component.get('v.accountId')
            
        });
        action.setCallback(this,function(response){
            
            var state = response.getState();
            if(state === 'SUCCESS' || state === 'DRAFT'){
                var responseValue = response.getReturnValue();
                  debugger;
                var componentEvent = component.getEvent('QuickContact');
              
                componentEvent.setParams({
                    ContactRecord: responseValue
                });
                componentEvent.fire();
            } else if(state === 'INCOMPLETE') {
                
            } else if(state === 'ERROR'){
                var errors = response.getError();
               // alert(errors[0]);
            }
        },'ALL');
        $A.enqueueAction(action);
    }
})