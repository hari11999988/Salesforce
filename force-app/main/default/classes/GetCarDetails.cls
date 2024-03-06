public class GetCarDetails 
{
    @auraenabled
    public static List<Car__c> getCar()
    {
        return [SELECT Id,Name,Cost_per_day__c,Image__c,Milage__c,Seat_cepacity__c	,Type__c FROM Car__c];
    }
    
    @auraenabled
    public static List<Car__c> indivisualCar(Id iddata)
    {
        return [SELECT Id,Name,Cost_per_day__c,Image__c,Milage__c,Seat_cepacity__c,Model__c,Type__c FROM Car__c WHERE id =:iddata];
    }
    
    @auraenabled
    public static boolean getUser()
    {
        //user u =[Select Id From User Where Id =: UserInfo.getUserId()];
        user u = [select Id, ContactId from User WHere Id =: UserInfo.getUserId()];
        if(u.ContactId == null){
            system.debug('false');
            return false;
        }else{
            system.debug('true');
            return true;
        }
       
    }
    @auraenabled
    public static boolean checkBooking(Map<string,string> data)
    {
        // {id :'  jf.kfe'}, {no of days : 5 } , {bookingdate : 156}
        // id = kfe
        // no of days = 5
        system.debug('data===>'+data);
        system.debug('data===>'+data.get('recordId'));
        id recordid = data.get('recordId');
        String recordDate = data.get('formatdate');
        String recorddays = data.get('No of days');
       
        Car__c carDetails = [SELECT Booking_date__c,No_of_days__c FROM Car__c WHERE id=:recordid];
        
        
        system.debug('query==>'+[SELECT Booking_date__c,No_of_days__c FROM Car__c WHERE id=:recordid]);
         system.debug('carDetails.Booking_date__c===>'+carDetails.Booking_date__c);
        //system.debug('carDetails.Booking_date__c.addDays(carDetails.No_of_days__c)===>'+carDetails.Booking_date__c.addDays(carDetails.No_of_days__c));
        system.debug('parse(recordDate)===>'+recordDate);
        system.debug('carDetails.No_of_days__c===>'+carDetails.No_of_days__c);
        
        
        
        Date temp = carDetails.Booking_date__c;
        if(temp.addDays((Integer)carDetails.No_of_days__c)<date.parse(recordDate))
        {
            return true; 
        }
        else 
        {
            return false;
        }
        
        
        
       
    }
    
    @auraenabled
    public static void createRecord(Map<String,String> data)
    {
        String recordDate = data.get('formatdate');
        String recorddays = data.get('No of days');
        Integer amount = integer.ValueOf(data.get('amount')); 
        Id carId = data.get('recordId');
        
        Car__c carDetails = [SELECT Name,Image__c FROM Car__c WHERE Id =:carId];
        
        system.debug('recordDate==>'+recordDate);
        system.debug('recorddays==>'+recorddays);
        user u = [select Id, ContactId from User WHere Id =: UserInfo.getUserId()];
        system.debug('contactid__c==>'+u.ContactId);
        
        bookingForCar__c b = new bookingForCar__c();
        b.contactid__c = u.ContactId;
        b.No_of_Days__c =recorddays;
        b.Pick_up_date__c = recordDate;
        b.Total_Amount__c = amount;
        b.Car_image__c = carDetails.Image__c;
        b.Name = carDetails.Name;
        
        system.debug('b===>'+b);
        insert b;
        
    }
    
    @auraenabled
    public static List<bookingForCar__c> getRecordId()
    {
        user u = [select Id, ContactId from User WHere Id =: UserInfo.getUserId()];
        return [SELECT contactid__c,No_of_Days__c,Total_Amount__c,Pick_up_date__c FROM bookingForCar__c WHERE contactid__c =:u.ContactId];
        //return u.ContactId;
    }
    
    
}