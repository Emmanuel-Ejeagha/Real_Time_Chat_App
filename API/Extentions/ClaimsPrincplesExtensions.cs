using System;
using System.Security.Claims;

namespace API.Extentions;

public static class ClaimsPrincplesExtensions
{
    public static string GetUserName(this ClaimsPrincipal user)
    {
        return user.FindFirstValue(ClaimTypes.Name) ?? throw new Exception("Cannot get username");
    }

    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        return Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Cannot get userid"));
    }
}
