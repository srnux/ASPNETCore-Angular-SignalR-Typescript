using System.Collections.Generic;
using IdentityServer4.Core.Models;

namespace IdentityServer.Configuration
{
    public class Scopes
    {
        public static IEnumerable<Scope> Get()
        {
            return new[]
            {
                // standard OpenID Connect scopes
                StandardScopes.OpenId,
                StandardScopes.ProfileAlwaysInclude,
                StandardScopes.EmailAlwaysInclude,

                new Scope
                {
                    Name = "angular2Demo",
                    DisplayName = "Scope for the angular2Demo.",
                    Type = ScopeType.Resource,
                    ScopeSecrets = new List<Secret>
                    {
                        new Secret("angular2DemoSecret".Sha256())
                    },
                    Claims = new List<ScopeClaim>
                    {
                        new ScopeClaim("role"),
                        new ScopeClaim("angular2Demo")
                    }
                }
            };
        }
    }
}