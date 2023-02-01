public class LeadTriggerHandler {

    public static void UpdateRating(List<Lead> LeadNew){
          for(Lead ld : LeadNew){
            if(ld.leadsource == 'Web'){
                ld.Rating = 'Cold';
            }
            else{
                 ld.Rating = 'Hot';
            }
        }
    }
}