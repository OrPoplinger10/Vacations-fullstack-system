class AppConfig {

     // Server Port
     public port = process.env.port || 4000;

     // Server Url:
     public serverUrl = "http://localhost:" + this.port;

     // Images url:
     public imagesUrl = this.serverUrl + "/api/vacations/images/";

     // Database host( on which computer the database exists);
     public mySqlHost = process.env.MYSQL_HOST || "localhost";

     // Database user
     public mySqlUser = process.env.MYSQL_USER || "root"

     // Database password
     public mySqlPassword = process.env.MYSQL_PASSWORD || "";

     // Database Name:
     public mySqlDatabase = process.env.MYSQL_DATABASE || "vacations-database";

     public socketPort = process.env.port || 4001;

}

const appConfig = new AppConfig();

export default appConfig;