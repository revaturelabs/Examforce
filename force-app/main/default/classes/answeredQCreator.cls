public without sharing class  answeredQCreator {
    @AuraEnabled
        public static void AnsweredQCreator(String s) {
        List<Answered_Question__c> Questions =  (List<Answered_Question__c>) JSON.deserialize(s, List<Answered_Question__c>.class);
        //Answered_Question__c a = new Answered_Question__c(Assigned_Exam__c ='a018Z00000rcR5FQAU',Question__c='a048Z00000jHupAQAS', Answered_Correctly__c = True, User_Answer__c = 'C');
        insert Questions;
        return;
    }
}