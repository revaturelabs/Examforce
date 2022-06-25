public class fetchExam {
    @AuraEnabled(cacheable=true)
    public static List<Question__c> fetchExam(){
        try { //WHERE Name will be a variable that links the users assigned exam
           //List<Assigned_Exam__c> assignedExam = [SELECT Exam__r.Id FROM Assigned_Exam__c WHERE name = 'AE-0000'];

           return [SELECT Id, Name, Active__c, Answer_A__c, Answer_B__c, Answer_C__c, Answer_D__c, Body__c,(SELECT Id from Question_Pools__r WHERE Exam__r.ID = '') FROM Question__c];
           

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
