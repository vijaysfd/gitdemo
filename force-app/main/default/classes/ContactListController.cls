public  class ContactListController {

     @AuraEnabled
	 public static List<Contact> getContactList(String accountID){
         
     	 	List<Contact> contactList =  new List<Contact> ([select id,Name,Email,Phone,FirstName,LastName 
                                                             from Contact 
                                                             where email !=null 
                                                             and AccountId =: accountID  limit 10]);
         return contactList;
    }
     @AuraEnabled
    public static Contact CreateContact(Contact con, Id AccountId){
        con.AccountId = AccountId;
        insert con;
        return con;
        
    }
}