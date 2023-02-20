public class BeerSearchAuraService {
	@AuraEnabled
    public static List<sObject> searchBeer(String searchParam){
        String likeParam = '%' + searchParam + '%' ; 
        string Query  = ' '; 
        if (searchParam != null){
           Query  = 'Select Id, Name,Alcohol__c,brewery_Name__c,brewery_id__c,Id__c,Price__c,Remaining_Quantity__c,	Tags__c,	Total_Quantity__c from Beer__C where Name Like :likeParam Limit 50';
        }else{
             Query  = 'Select Id, Name,Alcohol__c,brewery_Name__c,brewery_id__c,Id__c,Price__c,Remaining_Quantity__c,	Tags__c,	Total_Quantity__c from Beer__C  Limit 50';
        }
        List<sObject> sObjectList =  database.query(Query);
        return sObjectList;
    }
}