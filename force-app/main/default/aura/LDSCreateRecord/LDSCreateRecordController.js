({
        doInit : function(component, event, helper) {
            component.find('recordCreator').getNewRecord(
                'Beer__c',
                null,
                false,
                $A.getCallback(function(){
                    var record = component.get('v.record');
                    var error = component.get('v.recordError');
                    if(error || (record ===null)){
                        console.log('Error while creating template'+error);
                    }else{
                        console.log('Success');
                   //     alert('Templated created');
                    }
                })
            );
        },
        handleSave : function(component, event, helper){
            component.find('recordCreator').saveRecord(function(saveResult){
                if(saveResult.state === 'SUCCESS' || saveResult.state === 'DRAFT'){
                    var showToast = $A.get('e.force:showToast') ;
                    showToast.setParams({
                        "title" : "Record Save",
                        "type": "Success",
                        "message": "Beer Record has been Saved with the Record Id " + saveResult.recordId
                        
                    });
                    showToast.fire();
                 //   alert("Alert "+saveResult.state);
                } else if(saveResult.state === 'ERROR'){
                    
                }else if(saveResult.state === 'INCOMPLETE'){
                    
                }else{
                        
                 }
            });
        }
    })