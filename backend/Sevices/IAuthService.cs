using Api.Models;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface IAuthService
    {
        Task<(string? Token, string? UserType)> Authenticate(LoginRequest request);
    }
}
