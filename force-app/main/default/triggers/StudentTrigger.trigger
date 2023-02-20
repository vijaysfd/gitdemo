trigger StudentTrigger on Student__c (after insert, after Delete) {
    if( Trigger.isAfter ){
       if( Trigger.isInsert){
            StudentTriggerHandler.CreateStudentCount(Trigger.new);
        }
         if( Trigger.isDelete){
            StudentTriggerHandler.CreateStudentCount(Trigger.Old);
        }
    }
	
}