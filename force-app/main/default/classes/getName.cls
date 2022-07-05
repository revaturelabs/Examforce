public with sharing class getName {
    @AuraEnabled(cacheable=true)
    public static string getFirstName() {
        try {
        return UserInfo.getFirstName();
        }   catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }   
}
}