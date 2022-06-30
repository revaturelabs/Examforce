@isTest
public class testFetchExam {
    
    @testSetup
    static void makeTestData(){
	Question__c Q = new Question__c(Name='Q2', Body__c='What is your name?', Answer_A__c='Bob', Answer_B__c='Kat', Answer_C__c='Kory', Answer_D__c='Yury', Correct_Answer__c='A', Type__c='Multiple Choice');
	insert Q;
    Exam__c Exam2 = new Exam__c(Name='Exam2');
    insert Exam2;
    Question_Pool__c Pool = new Question_Pool__c(Exam__c= Exam2.Id, Question__c = Q.ID);
    insert Pool;
    }
      @isTest
    static void callTestData(){
        Exam__c q = [SELECT Id FROM Exam__c LIMIT 1];
        LIST<Question_Pool__c> qpList = fetchExam.fetchExam(q.Id);
        
        for(Question_Pool__c qp : qpList){
            System.assertEquals(q.Id, qp.Exam__r.Id);
        }
    }
}