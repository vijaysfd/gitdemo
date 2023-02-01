trigger UpdateAccountBsdonOppAmt on Opportunity (after insert) {
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

}