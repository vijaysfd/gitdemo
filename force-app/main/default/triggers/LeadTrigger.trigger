trigger LeadTrigger on Lead (before insert) {
    if(trigger.isInsert &&   trigger.isBefore ){
      LeadTriggerHandler.UpdateRating(trigger.new);
    }
}