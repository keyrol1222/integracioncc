namespace CuentasPorCobrar.Dtos;

public class CreditHistoryDto
{
    public int Id { get; set; }
    public string Cedula { get; set; }
    public string Rnc { get; set; }
    public string Concepto { get; set; }
    public DateTime Fecha { get; set; }
    public decimal MontoTotal { get; set; }
}