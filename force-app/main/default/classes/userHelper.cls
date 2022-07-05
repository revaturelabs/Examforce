/*
userHelper apex class
Developer: Yura & Kory 
Date Created: 06/22/22
Last Modified: 06/29/22
Description: To be called when a user is logged in to get all the exams that have been assigned to the user returns a List<Assigned_Exam__c>
*/
public without sharing class userHelper {

    // Need @AuraEnabled to use Apex in Aura or LWC
    // Need public static as well
    // Cacheable stores data in the client side storage so they don't have to wait for a server call
    // cacheable will improve performance, can't use it if you are modifying data
    // Biggest use case is when you are just returning data
    @AuraEnabled (cacheable=true)
    public static List<Assigned_Exam__c> getExamInfo() {
        try {
            String userEmail = UserInfo.getUserEmail();
            Contact con = [SELECT Id FROM Contact WHERE Email =: userEmail];
            return [SELECT Id, Exam__r.Name, Exam__r.Duration__c, Exam__r.id FROM Assigned_Exam__c WHERE Assigned_Exam__c.contact__r.Id =: con.Id];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }  
}