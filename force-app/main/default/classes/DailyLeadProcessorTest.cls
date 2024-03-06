@isTest
public class DailyLeadProcessorTest
{
    @testsetup
    static void setup()
    {
        List<Lead> lstoflead = new List<Lead>();
        for(Integer i=0;i<= 200 ;i++)
        {
            Lead ld = new Lead(Company  = 'comp' +i ,LastName = 'LN',status ='Working -contacted');
            lstoflead.add(ld);
            
            
        }
        insert lstoflead;
    }
    static testmethod void DailyLeadProcessorTestJob()
    {
        string sch = '0 5 12 * * ?';
        Test.startTest();
        string  jobId = system.Schedule('SchedulableTest',sch,new DailyLeadProcessor());
        List<Lead> listoflead  = [select id from Lead  where  LeadSource  = null Limit 200];
        system.assertEquals(200,listoflead.size());
        Test.stopTest();
    }
    

}