namespace CuentasPorCobrar.Models;

public class TipoDocument : BaseEntity
{
    public required string Descripcion { get; set; }
    public required string Cuenta { get; set; }

}