public class  getAccountData {
   
   @AuraEnabled(cacheable = true)
 //   @AuraEnabled
     public static List<Account> getAccountList() {
       return [SELECT Id, Name,Phone,Website FROM Account LIMIT 10];
   }
   
     @AuraEnabled(cacheable = true)
     public static List<Account> getAccountListSearch(string nameSearch) {
      string strName = '%' + nameSearch + '%' ;
      return [SELECT Id, Name,Phone,Website FROM Account where Name LIKE : strName  LIMIT 6];
     //  return [SELECT Id, Name,Phone,Website FROM Account LIMIT 10];
   }
     @AuraEnabled(Cacheable=true)
    public static list<Account> getAccWithCon(){
        return [SELECT Id, Name, Phone, Rating, (SELECT Id, FirstName, LastName FROM Contacts) FROM Account LIMIT 10 ];
    }

}