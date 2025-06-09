using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class Usuario
{
    public long Id { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string Email { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime? UpdatedAt { get; set; }

    // Nueva propiedad para diferenciar el tipo de usuario
    public string UserType { get; set; } = "CLIENT"; // Valor por defecto "CLIENT"
}