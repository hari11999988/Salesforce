trigger hari on Account (before insert)
{
    if(Trigger.isBefore && Trigger.isInsert){
        
        for(Account acc : Trigger.new){
            
            
            
            if(acc.Phone == null){
                
                acc.addError('fill phone!');
            }
        }
        
        
    }
}