using System.Collections.Generic;
using IdentityServer4.Core.Models;

namespace IdentityServer.Configuration
{
    public class Clients
    {
        public static List<Client> Get()
        {
            var httpsAddress = "https://localhost:5000";
            
            return new List<Client>
            {
                new Client
                {
                    ClientName = "angular2client",
                    ClientId = "angular2client",
                    Flow = Flows.Implicit,
                    RedirectUris = new List<string>
                    {
                        httpsAddress
                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        httpsAddress + "/Unauthorized.html"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        httpsAddress
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