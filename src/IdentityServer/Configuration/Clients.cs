using System.Collections.Generic;
using IdentityServer4.Core.Models;

namespace IdentityServer.Configuration
{
    public class Clients
    {
        public static List<Client> Get()
        {
           // var httpAdress = "http://localhost:5000/";
            var httpsAdress = "https://localhost:5000/";
            
            return new List<Client>
            {
                new Client
                {
                    ClientName = "angular2client",
                    ClientId = "angular2client",
                    Flow = Flows.Implicit,
                    RedirectUris = new List<string>
                    {
                        httpsAdress
                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        httpsAdress + "Unauthorized.html"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        httpsAdress                      
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "angular2Demo",
                        "role"
                    }
                }
            };
        }
    }
}