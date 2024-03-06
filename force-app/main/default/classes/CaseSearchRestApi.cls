public class CaseSearchRestApi {
    @AuraEnabled(cacheable=true)
    public static Case getCase(String casenumber)
    {
       // system.debug('casenumber==>'+casenumber);
         HttpRequest req = new HttpRequest();
         req.setEndpoint('callout:Case/services/apexrest/caseinfo?CaseNumber='+casenumber);
         req.setMethod('GET');
         Http http = new Http();
         HttpResponse res = new HttpResponse();
         res = http.send(req);
         System.debug('res=='+res);
         system.debug(res.getBody());
         System.debug(JSON.deserializeUntyped(res.getBody()));
         Case c = (Case)JSON.deserialize(res.getBody(), Case.Class);
         //case c = [SELECT Id,CaseNumber,Status,Priority,Description FROM Case WHERE CaseNumber=:casenumber];
         // system.debug(c);
         return c;
    }
    @AuraEnabled(cacheable=true)
    public static case updateCase(Case caseObj)
    {
        System.debug('in updateCase');
        String caseToUpdate = JSON.serialize(caseObj);
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Case/services/apexrest/caseinfo');
        system.debug('req.setEndpoint -->'+ req.getEndpoint());
        req.setMethod('PATCH');//When case is updated that time used PATCH
        req.setBody(caseToUpdate);
        Http http = new Http();
        HttpResponse res = new HttpResponse();
        res = http.send(req);
        Case c = (Case)JSON.deserialize(res.getBody(), Case.Class);
        return c;

    }

    @AuraEnabled(cacheable=true)
    public static String deleteCase(Id caseObj)
    {
        system.debug('inside delete method');
        System.debug('in deleteCase'+caseObj);
        //String caseToDelete = JSON.serialize(caseObj);
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Case/services/apexrest/caseinfo?CaseNumber='+caseObj);
        system.debug('req.setEndpoint -->'+ req.getEndpoint());
        req.setMethod('DELETE');
       // req.setBody(caseToDelete);
        Http http = new Http();
        HttpResponse res = new HttpResponse();
        res = http.send(req);
        return 'deleted';

    }

        
    

}