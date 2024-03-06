public class UserController {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserList() {
        return [SELECT Id, Name, Email, isActive,profile.name FROM User];
    }

    @AuraEnabled(cacheable=true)
    public static List<RecentlyViewed> getUserRecentList() {
        return [SELECT Id, Name, Email,Phone FROM RecentlyViewed  WHERE Type ='User'];
    }

}