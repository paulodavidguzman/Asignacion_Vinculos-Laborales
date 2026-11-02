using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;

namespace BackendAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Empleado> empleado { get; set; }
        public DbSet<VinculoLaboral> vinculolaboral { get; set; }
        public DbSet<EmpleadoVinculoLaboral> empleado_vinculolaboral { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmpleadoVinculoLaboral>()
                .Property(x => x.evl_id)
                .ValueGeneratedOnAdd();

            base.OnModelCreating(modelBuilder);
        }
    }
}