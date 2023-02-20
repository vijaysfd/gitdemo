trigger PreventAccountDelete on Account (before delete, after Update) {
	List <Contact> lstCon = new list<Contact>();
    for(Account ac : Trigger.old) {
        for(integer I = 0; I < ac.ContactCount__c; I++){
            System.debug('Con' + I );
            Contact Con = new Contact();
            Con.AccountId = ac.id;
         	Con.lastname = 'Con ' + I ;
            lstCon.add(Con);
              System.debug('After' + I );
        }
        if(!lstCon.isEmpty()){
             System.debug('Before Insert' );
            insert lstCon;
            System.debug('After Insert' );
        }
    }
    if(Trigger.isDelete){
     for(AggregateResult ar: [Select accountid, count(id)size from contact where accountId in : trigger.oldMap.Keyset() 
                              group by accountId ]){
                                  if((integer)ar.get('size')>=2){
                                      trigger.oldMap.get((id)ar.get('accountId')).addError('Cannot delete account if it has more than one record');
                                  }
                                  
         }
       }
}