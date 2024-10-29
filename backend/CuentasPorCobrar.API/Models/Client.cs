namespace CuentasPorCobrar.Models;

public class Client : BaseEntity
{
    public required string Name { get; set; }
    public required string Cedula { get; set; }
}