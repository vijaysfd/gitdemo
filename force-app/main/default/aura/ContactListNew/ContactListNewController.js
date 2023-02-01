({
    fetchCon : function(component, event, helper) {
        var action = component.get('c.getContactList');
        action.setParams({
            accountID: component.get('v.recordId'), //'0015i00000A0miIAAR'
        });
        action.setCallback(this,function(response){
            var responseValue = response.getReturnValue();  
            component.set('v.contactList',responseValue);
          
        });
        $A.enqueueAction(action,false);
    },
    doRedirect : function(component, event, helper) {
        var eventSource = event.getSource();
        var Id= eventSource.get('v.name');
        // alert(Id);
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": Id,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
    handleCompEvent :  function(component, event, helper){
       var availableContact = component.get('v.contactList');
       var contactRecord = event.getParam('ContactRecord');
   //     debugger;
       // console.log(ContactRecord);
        availableContact.push(contactRecord);
          component.set('v.contactList',availableContact);
    }
})