public class LeadWrapperController {
    public List<LeadWrapper> leadList{get;set;}
    public List<LeadWrapper> leadList2{get;set;}
    public List<Lead> toRemove{get;set;}
    public List<Lead> toAdd{get;set;}
    
    public Lead item{get;set;}
    public id deleteId{get;set;}
    public id addId{get;set;}
    public Integer indexNo{get;set;}
    public Boolean allChecked { get; set;}
    public Boolean allCheckeds { get; set;} 
    public boolean disabled{get;set;}
    public boolean adddisabled{get;set;}
    
    
//Wrapper 
    public class LeadWrapper{
        public Lead lead{get;set;}
        public boolean checkBox{get;set;}
        public boolean checkBoxs{get;set;}
        public boolean showData{get;set;}
        public Integer index{get;set;}
        public boolean disabledd{get;set;}
      
        
          public LeadWrapper(){
          checkBox = false;
    }
    }
 
    
//Constructor 
    public LeadWrapperController(){
        leadList = new List<leadWrapper>();
        leadList2 = new List<leadWrapper>();
        Integer counter = 0;
        allChecked = false;
        for(Lead le : [SELECT Id, FirstName, LastName, Company, Email FROM Lead order by FirstName NULLS LAST] ){
            LeadWrapper leadWrapper = new LeadWrapper();
            leadWrapper.lead = le;
            leadWrapper.index = counter + 1;
            system.debug('leadWrapper<<>> '+leadWrapper);
            leadList.add(leadWrapper);
        }
        toRemove = new List<Lead>();
        toAdd = new List<Lead>();
        disabled = true;
        adddisabled= true;
    }
   

//Show and hide readonly
    public void editReadOnly(){
        set<boolean> booleanSet = new set<boolean>();
        for(LeadWrapper le : leadList){
            if(le.checkBox){
                le.showData = true;
                le.disabledd = false;
            }else{
                le.showData = false;
                le.disabledd = true;
            } 
            
            if(le.disabledd) {
                booleanSet.add(le.disabledd);
            } else{
                booleanSet.add(le.disabledd);
            }
       
        }
        if(booleanSet.contains(false)){
            disabled = false;
        } else if (booleanSet.contains(true)){
            disabled = true;
        }
    } 
    
//Add Into Table1 readonly
    public void readOnly(){
        System.debug('inside readOnly');
        adddisabled= true;
        System.debug('inside readOnly');
        System.debug('inside readOnly==>'+adddisabled);
    }
      
    
 // Checkbox Select for all lead table-1
    public PageReference CheckAll(){
        for(LeadWrapper le : leadList){
            if(le.checkBox = allChecked){
                le.showData = true;
                disabled = false;
            }else { le.showData = false;
                disabled = true;
            }   
        }
        return null;
    }
    
// Checkbox Select for all lead table-2
    public PageReference CheckAlls(){
        for(LeadWrapper le : leadList2){
            if(le.checkBoxs = allCheckeds){
                le.showData = true;
                adddisabled = false;
            }else{
                le.showData = false;
                adddisabled = true;
            }
        }
        return null;
    }
    
//delete Item from row
    public void deleteItem(){
        System.debug('DD'+deleteId);
        if(!String.isBlank(deleteId)){
            toRemove.add(new Lead(id=deleteId));
            System.debug('$$'+toRemove);
            item = new Lead(id=deleteId);
            for(Integer i = leadList.size()-1;i>=0;--i){
                LeadWrapper leWrap = leadList[i];
                if(item.Id.equals(leWrap.lead.Id)){
                    System.debug('$$'+item +leWrap.lead);
                    leadList.remove(i);
                }
            }
        }else{
            System.debug('$$'+indexNo);
            for(Integer i = leadList.size()-1;i>=0;--i){
                LeadWrapper leWrap = leadList[i];
                if(indexNo == leWrap.index){
                    System.debug('$$'+indexNo+leWrap.index);
                    leadList.remove(i);
                }
            }
        }
    }
    
//add Item to row
    public void addItem(){
        item = new Lead(id=addId);
        for(Integer i = leadList.size()-1;i>=0;--i){
            LeadWrapper leWrap = leadList[i];
            if(item.Id.equals(leWrap.lead.Id)){
                System.debug('$$'+item +leWrap.lead);
                LeadWrapper addWrap = new LeadWrapper();
                addWrap.lead = new Lead();
                addWrap.checkBox = true;
                leadList.add(i+1, addWrap);
                editReadOnly();
                
                
            }
        }
    }

    
    
//Add selected list into new data table-2
    public void removeSelectedLeads(){
                  for ( Integer i = leadList.size() - 1; i >= 0; --i ){
                     Integer counterr = 0;
                         leadWrapper leadWrapperInstance = leadList[i];
                 if(leadWrapperInstance.showData){
                 LeadWrapper leadWrapper = new LeadWrapper();
            	leadWrapper.lead = leadWrapperInstance.lead;
            	leadWrapper.index = counterr + 1;
           		leadWrapper.checkBox = leadWrapperInstance.checkBox;
                leadWrapper.showData = leadWrapperInstance.showData;    
                system.debug('leadWrapper--> '+leadWrapper);
                    leadList2.add(leadWrapper);
                    leadList.remove(i);
                    disabled = true;
                     
                }	 
            }
         }

//Add selected list into Old data table-1   
    public void addSelectedLeads(){
        for ( Integer i = leadList2.size() - 1; i >= 0; --i ){
                     Integer counterr = 0;
                leadWrapper leadWrapperInstance = leadList2[i];
                 if(leadWrapperInstance.showData){
                LeadWrapper leadWrapper = new LeadWrapper();
            	leadWrapper.lead = leadWrapperInstance.lead;
            	leadWrapper.index = counterr + 1;
           		leadWrapper.checkBoxs = leadWrapperInstance.checkBoxs;
                leadWrapper.showData = leadWrapperInstance.showData;    
                system.debug('leadWrapper--> '+leadWrapper);
                    leadList.add(leadWrapper);
                    leadList2.remove(i);
                }	 
            }
    }

//save the list
    public PageReference save(){
        try{
            PageReference pg = new PageReference('/apex/lead_wrapper_list');
            for(LeadWrapper le : leadList){
                if(le.checkBox){
                    upsert le.lead;
                }
            }
            delete toRemove;
            pg.setRedirect(true);
            return pg;
        }
        catch(Exception ex){
            ApexPages.addMessages(ex);
        }
        return null;
    }    
    
//Cancle 
    public PageReference cancel() {     
    PageReference pageRef = new PageReference('/apex/leadDataTableVf'); 
    pageRef.setRedirect(true); 
    return pageRef;
   }
}