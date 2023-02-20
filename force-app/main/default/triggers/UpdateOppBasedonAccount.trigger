trigger UpdateOppBasedonAccount on Account (after  update) {
    if(CheckOppurtyLimit.LoopCheck == False){
        CheckOppurtyLimit.LoopCheck = true;
    Map<Id,Account> accUpd = trigger.newMap;
     DateTime CheckDate = System.now()-30;
	List<Opportunity> lstOpp = [select Id,Amount,StageName,Createddate from Opportunity 
                                where  AccountId in: accUpd.keyset()  ];
    system.debug(lstOpp.size());
    List<Opportunity> uOpp = new  List<Opportunity>();
   
    For(Opportunity opp : lstOpp){
         system.debug('In Loop');
        if(opp.StageName != 'Closed Won'  ){
                  system.debug('in Condition');
            opp.StageName = 'Closed Lost';
            uOpp.add(opp);
            system.debug('After Condition');
        }
    }
    If(uOpp != null){
        Update uOpp;
    }
    }
}