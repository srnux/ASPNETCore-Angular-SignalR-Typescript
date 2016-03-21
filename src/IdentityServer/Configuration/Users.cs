using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4.Core.Services.InMemory;

namespace IdentityServer.Configuration
{
    static class Users
    {
        public static List<InMemoryUser> Get()
        {
            var users = new List<InMemoryUser>
            {
                new InMemoryUser
                {
                    Subject = "48421157",
                    Username = "admin",
                    Password = "admin",
                    Claims = new Claim[]
                    {
                        new Claim(JwtClaimTypes.Name, "Fabian"),
                        new Claim(JwtClaimTypes.GivenName, "Fabian"),
                        new Claim(JwtClaimTypes.Email, "info@offering.solutions"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.Role, "admin"),
                        new Claim(JwtClaimTypes.Role, "angular2Demo.admin"),
                        new Claim(JwtClaimTypes.Role, "angular2Demo.user"),
                        new Claim(JwtClaimTypes.Role, "angular2Demo")
                    }
                }
            };

            return users;
        }
    }
}