public class PBInvocation {
    
    @InvocableMethod
    public static void updateChildRecords(List<Id> OppIDs){
        List<OpportunityLineItem> OppLineItemUpd = [SELECT id, Quantity from OpportunityLineItem where Quantity > 2 and OpportunityId IN : OppIDs  ];
     	System.debug('Befor');
        for(OpportunityLineItem OppItm : OppLineItemUpd ){
            OppItm.Quantity = 4;
             System.debug('After');
        }
        try{
            UPDATE OppLineItemUpd;
             System.debug('Success');
        }catch(Exception exp ){
            System.debug('-Error in Process');
        }
        
            
    }
}