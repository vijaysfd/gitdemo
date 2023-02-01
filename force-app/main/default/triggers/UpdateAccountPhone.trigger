trigger UpdateAccountPhone on Contact (after Update) {
    
	List<Account> accList = new List<Account>();
    Map<Id,string> accPhoneMap = new Map<Id,string>();
  	    if(!AvoidRecur.isRecursive ){
    //Looping through contact to check whether phone number is updated and adding to Map
    for(Contact con : Trigger.new){
        if(con.Phone != null && con.Phone != Trigger.oldMap.get(con.id).Phone){
            accPhoneMap.put(con.AccountID,con.Phone);
            system.debug('In Contact loop');
        }
        system.debug('Phone for '+accPhoneMap);
    }
    system.debug('Phone After loop '+accPhoneMap);
    
    //Looping through Account based on Account Id and updating Phone
    for(Account acc : [Select Id,name,Phone from account where Id in:accPhoneMap.keyset() ]){
        system.debug('In Account for '+ accPhoneMap.get(acc.id));
        	acc.Phone = accPhoneMap.get(acc.id);
        	accList.add(acc);
    }
    system.debug('Before update '+accList);
    if(!accList.isEmpty()){
        AvoidRecur.isRecursive = true;
            update accList;
    }
  }      
}