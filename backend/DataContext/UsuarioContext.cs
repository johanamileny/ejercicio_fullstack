using System;
using System.Collections.Generic;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.DataContext
{
    public partial class UsuarioContext : DbContext
    {
        public UsuarioContext(DbContextOptions<UsuarioContext> options)
            : base(options) { }

        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("usuarios_pkey");

                entity.ToTable("usuarios");

                entity.HasIndex(e => e.Email, "ukkfsp0s1tflm1cwlj8idhqsad0").IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp(6) without time zone")
                    .HasColumnName("created_at");
                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");
                entity.Property(e => e.Nombre)
                    .HasMaxLength(255)
                    .HasColumnName("nombre");
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("timestamp(6) without time zone")
                    .HasColumnName("updated_at");
                entity.Property(e => e.UserType)
                    .HasMaxLength(10)
                    .HasColumnName("user_type")
                    .HasDefaultValue("CLIENT");
            });
        }
    }
}