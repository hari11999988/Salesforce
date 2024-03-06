public class BirthdayScheduleApex implements Schedulable{
    public void execute(SchedulableContext SC)
    {
        ContactBatchApex con = new ContactBatchApex();
        Database.executeBatch(con);
        
    }
}