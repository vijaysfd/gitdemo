public class StudentTriggerHandler {

    public static void CreateStudentCount(List<Student__c> lstStudent){	
        Set<Id> stClassIds = new Set<Id>();
        For(Student__c std : lstStudent){
            if(std.Class__c != null){
            stClassIds.add(std.Class__C);
              }
        }
        List<Class__c> updClass = new List<Class__c>();
        List<Class__c> lstClass = [Select Id,Number_of_Students__c,(select Id from Students__r) from Class__c where Id IN : stClassIds];
        For(Class__C cls :lstClass ){
            cls.Number_of_Students__c = (integer)cls.Students__r.size();
            System.debug('Count' + cls.Students__r.size());
            updClass.add(cls);
        }
        if(!updClass.isEmpty()){
            update updClass;
        }
    }
}