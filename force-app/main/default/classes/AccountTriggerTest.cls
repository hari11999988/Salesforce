@isTest
public class AccountTriggerTest {
    @isTest
    public static void triggerMethodTest(){
        List<Account> acc = new List<Account>();
        for(integer i=0 ; i<200 ; i++){
            Account a = new Account();
            a.Name = 'test '+i;
            a.BillingState = 'CA';
            a.ShippingState = 'C';
            acc.add(a);
            Test.startTest();
            insert acc;
            Test.stopTest();
        }
    }
}