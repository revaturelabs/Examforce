public without sharing class fetchExam {
    @AuraEnabled(cacheable=true)
    public static List<Question_Pool__c> fetchExam(String q){
        try { //WHERE Name will be a variable that links the users assigned exam

           return [SELECT Question__r.Id, Question__r.Name, Question__r.Body__c, Question__r.Answer_A__c, Question__r.Answer_B__c, Question__r.Answer_C__c, Question__r.Answer_D__c, Question__r.Correct_Answer__c, Question__r.Type__c FROM Question_Pool__c WHERE Exam__r.ID =: q];
           

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}