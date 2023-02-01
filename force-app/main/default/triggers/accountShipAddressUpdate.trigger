trigger accountShipAddressUpdate on Account (Before insert, After Insert, before Update, after Update, Before Delete ) {

    If(Trigger.isBefore && Trigger.isInsert ){
        for(Account acctOb : Trigger.new ){
            if(acctOb.ShippingCity == null ) 
          		acctOb.ShippingCity =  acctOb.BillingCity ;
            if(acctOb.ShippingState == null ) 
          		acctOb.ShippingState =  acctOb.BillingState ;
            if(acctOb.ShippingCountry == null ) 
          		acctOb.ShippingCountry =  acctOb.BillingCountry ;
            if(acctOb.ShippingStreet == null ) 
          		acctOb.ShippingStreet  =  acctOb.BillingStreet  ;
            if(acctob.AnnualRevenue < 1000)
               acctob.addError('Annual Revenue is less than 1000');
                
            }
        }
      If(Trigger.isAfter && Trigger.isInsert ){
          List<Contact> myContact = new List<Contact>();
           for(Account acctOb : Trigger.new ){
               Contact con = new contact();
               con.AccountId = acctOb.id;
               con.LastName = acctOb.Name;
               myContact.add(con);
           }
          if(myContact.size()>0)
          insert myContact;
      }
     If(Trigger.isBefore && Trigger.isUpdate ){
         for(Account acctObNew : Trigger.new ){
             Account acctObOld = Trigger.oldMap.get(acctObNew.Id);
             if(acctObNew.Name !=  acctObOld.Name){
                 acctObNew.addError('Account Name cannot be modified');
             }
         }
     }
    If(Trigger.isAfter && Trigger.isUpdate ){
        Set<Id> accAdressChangedId = new  Set<Id>();
        for(Account acctObNew : Trigger.new ){
             Account acctObOld = Trigger.oldMap.get(acctObNew.Id);
             if(acctObNew.BillingCity !=  acctObOld.BillingCity){
                 accAdressChangedId.add(acctObNew.Id);
             }
         }
        //Fetch accounts and contact which have above Id's for changed Address
        
        List<Account> accsWithContact = [SELECT Id, Name,BillingCity,BillingStreet,BillingState,BillingCountry,(SELECT ID,FirstName from Contacts) FROM Account WHERE Id IN :accAdressChangedId ];
        List<Contact> contactListToUpdate = new List<Contact>();
        For(Account acc : accsWithContact){
            List<Contact> conMatched =  acc.contacts;
            for(Contact con : conMatched ){
                con.MailingCity = acc.BillingCity;
                con.MailingStreet = acc.BillingStreet;
                con.MailingState = acc.BillingState;
                con.MailingCountry = acc.BillingCountry;
                contactListToUpdate.add(con);
            }
        }
        If(contactListToUpdate.size()>0)
        	update contactListToUpdate;
    }
    If(Trigger.isBefore && Trigger.isDelete){
        For(Account acc : Trigger.Old){
            if(acc.Active__c == 'Yes'){
                acc.addError('Active Accounts cannot be deleted');
            }
            
        }
    }
   }