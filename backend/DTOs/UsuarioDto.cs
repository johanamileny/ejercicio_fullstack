namespace Api.DTOs
{
    public class UsuarioDto
    {
        public long Id { get; set; }
        public string Email { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string UserType { get; set; } = "CLIENT";
    }

}