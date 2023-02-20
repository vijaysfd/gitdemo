public class AccountController {
 @AuraEnabled
    public static List <Account> fetchAccounts(String searchKeyword) {
        String   searchKey = String.isBlank(searchKeyword) ? '%%' : '%' + searchKeyword + '%'; 
        System.debug('Line 5'+searchKey);
        //Query 5 accounts
        List<Account> accList = [SELECT Id, Name, BillingState, 
                                    Website, Phone, Industry, Type from Account  
                                    where Name   like: searchKey LIMIT 5];
        //return list of accounts
        return accList;
        //Test
    }
}