public with sharing class ToDoListController {
  
    @AuraEnabled(cacheable = true)
    public static List<task> getTasks(){
        try {
            
            return [select 	Subject from Task  where OwnerId =: userinfo.getuserid() ];
        } catch (Exception e) {
            System.debug('Error');
            throw new AuraHandledException(e.getMessage());
         
        }
    }
}''