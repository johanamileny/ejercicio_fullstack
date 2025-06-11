using Api.Models;
using Api.Repositories;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        public async Task<(string? Token, string? UserType, string? Name)> Authenticate(LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return (null, null, null);

            var usuario = await _usuarioRepository.GetByEmailAsync(request.Email);
            if (usuario == null || usuario.Password != request.Password)
                return (null, null, null);

            var jwtKey = _configuration["Jwt:Key"]
                         ?? throw new InvalidOperationException("JWT Key not configured.");
            var jwtIssuer = _configuration["Jwt:Issuer"]
                            ?? throw new InvalidOperationException("JWT Issuer not configured.");
            var jwtAudience = _configuration["Jwt:Audience"]
                              ?? throw new InvalidOperationException("JWT Audience not configured.");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                    new Claim(ClaimTypes.Email, usuario.Email),
                    new Claim(ClaimTypes.Role, usuario.UserType),
                    new Claim(ClaimTypes.Name, usuario.Nombre) // ✅ Incluye el nombre en los claims
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = jwtIssuer,
                Audience = jwtAudience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return (tokenHandler.WriteToken(token), usuario.UserType, usuario.Nombre); // ✅ Devuelve el nombre
        }
    }
}
