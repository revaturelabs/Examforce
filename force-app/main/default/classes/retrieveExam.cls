public without sharing class retrieveExam {
    @AuraEnabled(cacheable=true)
    public static List<Question_Pool__c> getExam(String q){
        try {
            //String examId = q;
            return [SELECT Question__r.Id, Question__r.Name, Question__r.Body__c, Question__r.Answer_A__c, Question__r.Answer_B__c, Question__r.Answer_C__c, Question__r.Answer_D__c, Question__r.Correct_Answer__c, Question__r.Type__c FROM Question_Pool__c WHERE Exam__r.ID =: q];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
