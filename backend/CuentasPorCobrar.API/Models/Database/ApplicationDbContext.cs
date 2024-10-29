using Microsoft.EntityFrameworkCore;

namespace CuentasPorCobrar.Models.Database;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<TipoDocument> TipoDocuments => Set<TipoDocument>();
}