global class LoginUser {
    @AuraEnabled
    global static string login(string userName, string password){
        string homeUrl ='https://playful-impala-4gyezl-dev-ed.my.site.com/s/';
        ApexPages.PageReference pageRef = site.login(userName,password,homeUrl);
        return pageRef.getUrl();
    }
    

}