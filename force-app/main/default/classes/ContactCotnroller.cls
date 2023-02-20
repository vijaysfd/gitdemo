public with sharing class ContactCotnroller {
	
    @AuraEnabled(Cacheable =true)
	 public static List<contact> searchcontacts(){
        return [select id,FirstName, LastName, phone,Email from Contact limit 5];
    }
     @AuraEnabled
    public static contact ContactFindbyID(string contactID) {
        return [select Id,name,phone,mobilephone,title,Account.Name from Contact  where Id =: contactID];
    }
    @AuraEnabled
     public static List<contact> searchbyquery(string searchquery){
         string searchName = '%' + searchquery + '%';
        return [select id,name,phone from Contact where  name LIKE:searchName limit 10 ];
    }
}