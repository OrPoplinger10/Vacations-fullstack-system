
class AppConfig{
    
    public registerUrl = "http://localhost:4000/api/auth/register/"
    public loginUrl = "http://localhost:4000/api/auth/login/"
    public vacationsUrl = "http://localhost:4000/api/vacations/"
    public ordersUrl = "http://localhost:4000/api/orders/"
    public followUrl = "http://localhost:4000/api/follow/"
    public vacationImageUrl = "http://localhost:4000/api/vacations/images/"
    public socketUrl = "http://localhost:4001"
 
}

const appConfig = new AppConfig();

export default appConfig