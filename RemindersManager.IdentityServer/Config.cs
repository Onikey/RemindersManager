using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace RemindersManager.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
            => new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };

        public static IEnumerable<ApiResource> GetApis()
            => new ApiResource[]
            {
                new ApiResource("api", "Reminders Manager API")
            };

        public static IEnumerable<Client> GetClients()
            => new Client[]
            {
                new Client
                {
                    ClientId = "angular",
                    ClientName = "Angular Client",
                    AllowedGrantTypes = {GrantType.Implicit},
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris = {"http://localhost:4200/auth/callback"},
                    PostLogoutRedirectUris = { "http://localhost:4200/" },
                    AllowedCorsOrigins = { "http://localhost:4200" },
                    AllowAccessTokensViaBrowser = true,

                    AllowedScopes =
                    {
                        "api",
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email
                    }
                }
            };
    }
}