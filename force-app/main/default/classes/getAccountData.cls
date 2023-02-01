public class getAccountData {
   
    @AuraEnabled(cacheable = true)
  //  @AuraEnabled
   public static List<Account> getAccountList() {
       return [SELECT Id, Name,Phone,Website FROM Account LIMIT 10];
   }
   
     @AuraEnabled(cacheable = true)
  //  @AuraEnabled
   public static List<Account> getAccountListSearch(string nameSearch) {
       string strName = '%' + nameSearch + '%' ;
       return [SELECT Id, Name,Phone,Website FROM Account where Name LIKE : strName];
   }
}