trigger UpdateRelatedContactPhone on Account (after update) {

    if(trigger.isAfter && trigger.isUpdate){
        Set<ID> accIds = new  Set<ID>();
        List<Contact> conList = new List<Contact>();
        For(Account acc : Trigger.New){
            if(acc.Phone != null && acc.Phone != Trigger.oldMap.get(acc.id).Phone){
                accIds.add(acc.id);
            }
        }
        
        for(Account acc : [select Id,phone, (select Homephone from contacts) from Account where Id in:accIds]){
            If(acc.Contacts != null){
                For(Contact con : acc.Contacts){
                    con.HomePhone = acc.Phone;
                    conList.add(con);
                }
            }
        }
        if(accIds.size()>0)
        {
            update conList;
        }
    }
    
    
}