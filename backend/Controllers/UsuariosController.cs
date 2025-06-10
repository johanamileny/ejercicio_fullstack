using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetUsuarios()
        {
            var usuarios = await _usuarioService.GetAllUsuariosAsync();

            return Ok(usuarios.Select(u => new
            {
                u.Id,
                u.Email,
                u.Nombre,
              
                
            }));
        }

        [Authorize] 
        // GET: api/Usuarios/email/example@gmail.com
        [HttpGet("email/{email}")]
        public async Task<ActionResult<object>> GetUsuario(string email)
        {
            var usuario = await _usuarioService.GetUsuarioByEmailAsync(email);
            if (usuario == null)
                return NotFound();

            return Ok(new
            {
                usuario.Id,
                usuario.Email,
                usuario.Nombre,
                usuario.UserType
            });
        }

        [Authorize]
        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetUsuario(long id)
        {
            var usuario = await _usuarioService.GetUsuarioByIdAsync(id);
            if (usuario == null)
                return NotFound();

            return Ok(new
            {
                usuario.Id,
                usuario.Email,
                usuario.Nombre,
                usuario.UserType
            });
        }

        // POST: api/Usuarios
        [HttpPost]
        public async Task<ActionResult<object>> PostUsuario([FromBody] Usuario usuario)
        {
            if (string.IsNullOrEmpty(usuario.Email) || string.IsNullOrEmpty(usuario.Password))
                return BadRequest("Email and password are required.");

            var existingUser = await _usuarioService.GetUsuarioByEmailAsync(usuario.Email);
            if (existingUser != null)
                return Conflict("A user with this email already exists.");

            var createdUsuario = await _usuarioService.CreateUsuarioAsync(usuario);

            return CreatedAtAction(nameof(GetUsuario), new { email = createdUsuario.Email }, new
            {
                createdUsuario.Id,
                createdUsuario.Email,
                createdUsuario.Nombre,
                createdUsuario.UserType
            });
        }

        // POST: api/Usuarios/register
        [HttpPost("register")]
        public async Task<ActionResult<object>> RegisterUsuario([FromBody] Usuario usuario)
        {
            if (string.IsNullOrEmpty(usuario.Email) || string.IsNullOrEmpty(usuario.Password))
                return BadRequest("Email and password are required.");

            var existingUser = await _usuarioService.GetUsuarioByEmailAsync(usuario.Email);
            if (existingUser != null)
                return Conflict("A user with this email already exists.");

            var newUser = await _usuarioService.RegisterUsuarioAsync(usuario);

            return CreatedAtAction(nameof(GetUsuario), new { email = newUser.Email }, new
            {
                newUser.Id,
                newUser.Email,
                newUser.Nombre,
                newUser.UserType
            });
        }

        [Authorize]
        // PUT: api/Usuarios/email/test@example.com
        [HttpPut("email/{email}")]
        public async Task<IActionResult> PutUsuario(string email, [FromBody] Usuario usuario)
        {
            if (email != usuario.Email)
                return BadRequest("El email de la URL no coincide con el email del usuario.");

            var updatedUsuario = await _usuarioService.UpdateUsuarioByEmailAsync(email, usuario);
            if (updatedUsuario == null)
                return NotFound();

            return NoContent();
        }

        [Authorize]
        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(long id)
        {
            var result = await _usuarioService.DeleteUsuarioAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}