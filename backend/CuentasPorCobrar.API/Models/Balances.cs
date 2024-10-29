namespace CuentasPorCobrar.Models;

public class Balances : BaseEntity
{
    public required string Fecha { get; set; }
    public required string Antiguedad { get; set; }
    public required string Monto { get; set; }

}