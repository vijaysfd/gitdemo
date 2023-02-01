trigger CheckOppClosedOwn on Opportunity (before insert) {
    set<id> ids = new set<id>();
    For(Opportunity op : trigger.new){
        if(op.StageName == 'Closed won'){
            ids.add(op.AccountId);
        }
    }
   List<Account> acnts =  [select Id,name,rating from account where id in:ids ];
   List<Account> ant = new List<Account>(); 
    for(Account ac : acnts){
        ac.rating = 'Hot';
        ant.add(ac);
    }
	update ant;
}