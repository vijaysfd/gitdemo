trigger DuplicateEmailsInLead on Lead (before insert) {

    set<string> sEmail = new  set<string>();
    for(Lead ld : trigger.new)
    {
        sEmail.add(ld.email);
    }

    List<Lead> lstLead = [select id, Name, Email, Phone From Lead Where Email in:sEmail ];
    for(lead ld : lstLead ){
            system.debug('Before');
        //Commented as there is error
       // ld.email.addError('Email is assigned to other lead'); 
        system.debug('After');
    }
    
}