using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace CuentasPorCobrar.Models.Database;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<TipoDocument> TipoDocuments => Set<TipoDocument>();
    public DbSet<Balances> Balances => Set<Balances>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(new SoftDeleteInterceptor());
        base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = Expression.Parameter(entityType.ClrType, "e");
                var filter = Expression.Lambda(
                    Expression.NotEqual(
                        Expression.Property(parameter, nameof(BaseEntity.Status)),
                        Expression.Constant(Status.Deleted)
                    ),
                    parameter
                );
                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(filter);
            }
        }
    }
}