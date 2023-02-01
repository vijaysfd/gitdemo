public class AccountTriggerHandler{
    public static void beforeInsert(List<Account> newList){
        for(Account ac: newList){
            if(ac.Industry != null && ac.Industry == 'Media'){
                ac.Rating = 'Hot';
            }else{
                  ac.Rating = 'Cold';
            }
        }
    }
    public static void createNewOppt(List<Account> newList){
        List<Opportunity> newOpp = new  List<Opportunity>();
        for(Account ac: newList){
            Opportunity opp = new Opportunity();
            opp.Name = ac.Name;
            opp.AccountId = ac.Id;
            opp.StageName = 'Prospecting';
            opp.CloseDate = System.today();
            newOpp.add(opp);
        }
        if(!newOpp.isEmpty()){
        	insert newOpp;
        }
        
    }
 
}