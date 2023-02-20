public class CheckOppurtyLimit {
   public static Boolean LoopCheck = False;
     public static void checkOppurtyLimitTrigger(List<Opportunity> opNew){
        Double Day_Amount=0;
        
        AggregateResult[] ar = [select sum(Amount) sm from Opportunity where CreatedDate = TODAY 
                              and CreatedById =: Userinfo.getUserId()];
         if(ar.size() > 0 && ar != null){
       		Day_Amount =(double)(ar[0].get('sm') == null ? 0 :ar[0].get('sm'));
             
         }
         //System.debug('Day_Amount' + Day_Amount);
         /*
         for(Opportunity op1: [select Amount from Opportunity where CreatedDate = TODAY 
                              and CreatedById =: Userinfo.getUserId()]){
                                Day_Amount  = Day_Amount+ op1.Amount;
          }*/
        for(Opportunity op2: opNew){
            
            Day_Amount  = Day_Amount+op2.Amount;
            If(Day_Amount>20000)
               op2.addError('You have exceeded the amount specified to you'); 
        }
        
    }
    
}