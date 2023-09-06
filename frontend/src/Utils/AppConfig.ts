
class AppConfig{

    // public baseUrl ="http://localhost:4000" // dev
    public baseUrl ="http://13.53.126.50:4000" // prod

    // public socketUrl = "http://localhost:4001" // dev
    public socketUrl = "http://13.53.126.50:4001" //prod
        
    public registerUrl =  this.baseUrl + "/api/auth/register/"
    public loginUrl = this.baseUrl + "/api/auth/login/"
    public vacationsUrl = this.baseUrl + "/api/vacations/"
    public ordersUrl = this.baseUrl + "/api/orders/"
    public contactsUrl = this.baseUrl + "/api/contacts/"
    public followUrl = this.baseUrl + "/api/follow/"
    public vacationImageUrl = this.baseUrl + "/vacations/images/"
   
}

const appConfig = new AppConfig();

export default appConfig