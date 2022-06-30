public without sharing class userHelper {

    // Need @AuraEnabled to use Apex in Aura or LWC
    // Need public static as well
    // Cacheable stores data in the client side storage so they don't have to wait for a server call
    // cacheable will improve performance, can't use it if you are modifying data
    // Biggest use case is when you are just returning data
    
    @AuraEnabled (cacheable=true)
    public static List<Assigned_Exam__c> getUserName() {
        try {
            String userEmail = UserInfo.getUserEmail();
            Contact con = [SELECT Id FROM Contact WHERE Email =: userEmail];
            return [SELECT Exam__r.Name, Exam__r.Duration__c, Exam__r.id FROM Assigned_Exam__c WHERE Assigned_Exam__c.contact__r.Id =: con.Id];
            //return [SELECT Exam__r.Name, Exam__r.Duration__c, Exam__r.id FROM Assigned_Exam__c WHERE Assigned_Exam__c.contact__r.Id = '0038Z00002sWpZKQA0'];
            //System.debug(userExam);
            //return userExam[0].Exam__r.Name;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
        

    }  
    

    

    // @AuraEnabled (cacheable=true)
    // public static string getExam(){
    //     return UserInfo.getUserEmail();
        
    //     //console.log(userId);
        
        
    // }
    
           
  
    
}
