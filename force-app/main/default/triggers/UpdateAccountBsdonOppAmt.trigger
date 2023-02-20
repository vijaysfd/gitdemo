trigger UpdateAccountBsdonOppAmt on Opportunity (after insert, after update) {
    
    
    if(Trigger.isInsert || trigger.isUpdate ){
        Set<Id> accIds = new Set<Id>();
        for(Opportunity opp : trigger.new){
            if(opp.Amount != null){
                accIds.add(opp.AccountId);
            }
        }
        List<Account> acc = new List<Account>();
        List<Account> accOpp = [Select id, name, AnnualRevenue,(select Id, AccountId, Amount from Opportunities) from Account where Id in : accIds ];
        for(Account acP : accOpp)   {
            acP.AnnualRevenue = 0;
            for(Opportunity opp : acP.Opportunities){
                if(opp.amount != null){
                acP.AnnualRevenue = acP.AnnualRevenue+opp.Amount ;
               }
            }
            acc.add(acP);
        }
        if(acc != null){
            update acc;
        }
        
    }
    
    
    /*
     //Commented this to change logic
    if(Trigger.isInsert ){
        if(Trigger.isAfter){
            //AnnualRevenue
            Set<Id> accountIDs = new Set<Id>();
            For(Opportunity opp : Trigger.new){
                if(opp.Amount != null) {
                    accountIDs.add(opp.AccountID);
                }
                  
            }
            List<Account> accList = [Select ID,name,AnnualRevenue from Account where ID in :accountIDs ];
            List<Account> accToBeUpdated = new List<Account>();
            for(Account acc: accList){
             
                Account ac = new Account();
                ac.Id = Acc.Id;
                ac.AnnualRevenue = Trigger.newMap.get(acc.id).Amount;
                accToBeUpdated.add(ac);
               
            }
            if(!accToBeUpdated.isEmpty())
           	 Update accToBeUpdated;
        }
    }
*/
}