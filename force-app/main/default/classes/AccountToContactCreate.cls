public class AccountToContactCreate {

    public static void CreateContactBasedonAccount(List<Account> acNew){
       List<Contact> newContact = new  List<Contact>();
        id myid = userinfo.getUserId();
        for(Account ac : acNew){
         /*  if(myid == ac.OwnerId){
                ac .adderror('cant add Contact');
            }*/
                 Contact ct = new  Contact();
                ct.AccountId = ac.Id;
                ct.Phone = ac.Phone;
                ct.LastName = ac.Name;
                if(ac.Industry == 'Banking' && myid == ac.OwnerId){
                   
                   ct.LastName = ac.Name+'Bank Same';
                   
                }
            	else if(ac.Industry == 'Banking' && myid != ac.OwnerId){
                   
                   ct.LastName = ac.Name+'Bank Diff';
                   
                }
                else{
                     ct.LastName = ac.Name+'Other';
                }
                 newContact.add(ct);
     	   
        }
        insert newContact;
    }
}