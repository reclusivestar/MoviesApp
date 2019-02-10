using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace moviesapp.Models
{
    public partial class moviesContext : DbContext
    {
        public virtual DbSet <Movies> Movies
        {
            get;
            set;
        }

        public moviesContext(DbContextOptions<moviesContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movies>(entity =>
            {
                entity.HasKey(e => e.id);
                entity.Property(e => e.Title)
                 .HasMaxLength(100)
                 .IsUnicode(false);
                entity.Property(e => e.listTitle)
                 .HasMaxLength(255)
                 .IsUnicode(false);
            });
        }
    }
}
