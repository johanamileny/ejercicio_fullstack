using Api.Models;
using Api.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly UsuarioContext _context;

        public UsuarioRepository(UsuarioContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }
        public async Task<Usuario?> GetByIdAsync(long id)
        {
            return await _context.Usuarios.FindAsync(id);
        }
       
        public async Task<Usuario?> GetByEmailAsync(string email)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Usuario> CreateAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> UpdateUsuarioByEmailAsync(string email, Usuario usuario)
        {
            var existingUsuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
            if (existingUsuario == null)
                return null;

            usuario.Id = existingUsuario.Id;
            _context.Entry(existingUsuario).CurrentValues.SetValues(usuario);

            await _context.SaveChangesAsync();
            return existingUsuario;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return false;

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(long id)
        {
            return await _context.Usuarios.AnyAsync(u => u.Id == id);
        }

        public async Task<Usuario> RegisterUsuarioAsync(Usuario usuario)
        {
            usuario.CreatedAt = usuario.CreatedAt.HasValue
                ? DateTime.SpecifyKind(usuario.CreatedAt.Value, DateTimeKind.Unspecified)
                : DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);

            usuario.UpdatedAt = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }
    }

    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> GetAllAsync();
        Task<Usuario?> GetByIdAsync(long id);
        Task<Usuario?> GetByEmailAsync(string email);
        Task<Usuario> CreateAsync(Usuario usuario);
        Task<Usuario?> UpdateUsuarioByEmailAsync(string email, Usuario usuario);
        Task<bool> DeleteAsync(long id);
        Task<bool> ExistsAsync(long id);
        Task<Usuario> RegisterUsuarioAsync(Usuario usuario);
    }
}