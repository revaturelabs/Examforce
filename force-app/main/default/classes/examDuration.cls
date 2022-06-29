public class examDuration {
    @AuraEnabled(cacheable=true)
    public static List<Assigned_Exam__c> examDuration(){
        try { //WHERE Name will be a variable that links the users assigned exam

           return [SELECT Exam__r.Duration__c,Exam__r.Name FROM Assigned_Exam__c WHERE Id = 'a018Z00000raxd9QAA'];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}