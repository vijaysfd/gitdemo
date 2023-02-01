trigger CheckOppurtyLimitTrigger on Opportunity (before insert) {

    If(Trigger.isInsert){
        CheckOppurtyLimit.checkOppurtyLimitTrigger(Trigger.new);
    }
}