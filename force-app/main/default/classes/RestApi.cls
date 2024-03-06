@RestResource(urlmapping='/getleadinfo/*')
global class RestApi {
    @Httpget
    global static Lead getLead()
    {
        System.debug('inside getLead');
        Restrequest req = Restcontext.request;
        system.debug('Restcontext.request ==>'+Restcontext.request);
        Restresponse res = Restcontext.response;
        system.debug('Restcontext.response ==>'+Restcontext.response);
        String urlId = req.requestURI.substring(req.requestURI.lastindexof('/')+1);
        system.debug('urlId --- '+urlId);
        Lead id = [SELECT Id,Name From Lead WHERE ID=:urlId];
        System.debug('id --- '+id);
        return id;
    }

}