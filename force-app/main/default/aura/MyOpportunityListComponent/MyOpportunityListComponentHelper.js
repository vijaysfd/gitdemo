({
    fetchOppHelper : function(searchValue,component) {
        component.set("v.columnsToDiplay",[
            {label:'Name', fieldname: 'Name', type: 'text'},
            {label:'Stage', fieldname: 'StageName', type: 'text'},
         //   {label:"Close Date", fieldname: "CloseDate", type: "date"},
            {label:"Amount", fieldname: "Amount", type: "currency"}
        ]);
        
        //[{"Id":"0065i0000078W2OAAU","Name":"Laptops Required","Amount":65000,"StageName":"Closed Lost"},{"Id":"0065i000005wuT9AAI","Name":"Grand Hotels Guest Portable Generators","Amount":250000,"StageName":"Value Proposition"},{"Id":"0065i000005wuTAAAY","Name":"Edge Emergency Generator","Amount":75000,"StageName":"Closed Won"},{"Id":"0065i000005wuTBAAY","Name":"University of AZ Portable Generators","Amount":50000,"StageName":"Closed Won"},{"Id":"0065i000005wuTCAAY","Name":"Pyramid Emergency Generators","Amount":100000,"StageName":"Prospecting"},{"Id":"0065i000005wuTDAAY","Name":"Express Logistics Portable Truck Generators","Amount":80000,"StageName":"Value Proposition"},{"Id":"0065i000005wuTEAAY","Name":"GenePoint Lab Generators","Amount":60000,"StageName":"Id. Decision Makers"},{"Id":"0065i000005wuTFAAY","Name":"GenePoint SLA","Amount":30000,"StageName":"Closed Won"},{"Id":"0065i000005wuTGAAY","Name":"United Oil Installations","Amount":270000,"StageName":"Negotiation/Review"},{"Id":"0065i000005wuTHAAY","Name":"Edge Installation","Amount":50000,"StageName":"Closed Won"}]
       
        var action = component.get("c.fetchOpportunity");
    //   alert(searchValue);
        action.setParams({"searchField":searchValue});
        
        action.setCallback(this,function(response){
            var state = response.getState();
           
            if(state === "SUCCESS"){    
             //   debugger;
                component.set("v.lstOpportunity",response.getReturnValue() );
             //   console.log('opplst' + JSON.stringify(component.get("v.lstOpportunity")));
            }else{
                alert("Error occured");                   
            }
            
        });
             $A.enqueueAction(action); 
    }
})