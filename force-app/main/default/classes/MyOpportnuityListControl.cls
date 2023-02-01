public  with sharing class MyOpportnuityListControl {
    
     @AuraEnabled
    public static List<Opportunity> fetchOpportunity(String searchKeyword){
        List<Opportunity> returnList = new  List<Opportunity>();
        //searchKeyword='Ed';
        //if search value is null return all records else search using search string
		String   searchKey = String.isBlank(searchKeyword) ? '%%' : searchKeyword + '%';   
        
       // System.debug(searchKey);
        returnList = [ SELECT id, Name,Amount,StageName
                      FROM Opportunity
                     where Name
					  like: searchKey
                      limit 10];        
        return returnList;
    }

}