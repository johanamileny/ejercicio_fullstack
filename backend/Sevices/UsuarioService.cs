using Api.Models;
using Api.Repositories;
using BCrypt.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Api.DataContext;

namespace Api.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<IEnumerable<Usuario>> GetAllUsuariosAsync()
        {
            return await _usuarioRepository.GetAllAsync();
        }

        public async Task<Usuario?> GetUsuarioByIdAsync(long id)
        {
            return await _usuarioRepository.GetByIdAsync(id);
        }

        public async Task<Usuario?> GetUsuarioByEmailAsync(string email)
        {
            return await _usuarioRepository.GetByEmailAsync(email);
        }

        public async Task<Usuario> CreateUsuarioAsync(Usuario usuario)
        {
            return await _usuarioRepository.CreateAsync(usuario);
        }

        public async Task<Usuario?> UpdateUsuarioByEmailAsync(string email, Usuario usuario)
        {
            return await _usuarioRepository.UpdateUsuarioByEmailAsync(email, usuario);
        }

        public async Task<bool> DeleteUsuarioAsync(long id)
        {
            return await _usuarioRepository.DeleteAsync(id);
        }

        public async Task<Usuario> RegisterUsuarioAsync(Usuario usuario)
        {
            usuario.Password = HashPassword(usuario.Password);
            usuario.UserType = string.IsNullOrEmpty(usuario.UserType) ? "CLIENT" : usuario.UserType;

            return await _usuarioRepository.RegisterUsuarioAsync(usuario);
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }

    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetAllUsuariosAsync();
        Task<Usuario?> GetUsuarioByIdAsync(long id);
        Task<Usuario?> GetUsuarioByEmailAsync(string email);
        Task<Usuario> CreateUsuarioAsync(Usuario usuario);
        Task<Usuario?> UpdateUsuarioByEmailAsync(string email, Usuario usuario);
        Task<bool> DeleteUsuarioAsync(long id);
        Task<Usuario> RegisterUsuarioAsync(Usuario usuario);
    }
}