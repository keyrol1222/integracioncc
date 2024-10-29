namespace CuentasPorCobrar.Models;

public class Transaction : BaseEntity
{
    public required string TypeMovement { get; set; }
    public int TypeDocumentId { get; set; }
    public TipoDocument? TypeDocument { get; set; }
    public int NumberDocument { get; set; }
    public DateTimeOffset Date { get; set; }
    public int ClientId { get; set; }
    public Client? Client { get; set; }
    public decimal Amount { get; set; }
}