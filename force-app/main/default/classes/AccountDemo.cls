public with sharing class AccountDemo {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
    try{ 
        List<Account> accList=  [SELECT Id,Name FROM Account ];
        return accList;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
    
    }
     
}