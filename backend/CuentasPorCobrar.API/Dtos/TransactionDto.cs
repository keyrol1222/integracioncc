namespace CuentasPorCobrar.Dtos;

public class TransactionDto
{
    public int Id { get; set; }
    public required string TypeMovement { get; set; }
    public int TypeDocumentId { get; set; }
    public string TypeDocumentAccount { get; set; }
    public int NumberDocument { get; set; }
    public DateTimeOffset Date { get; set; }
    public int ClientId { get; set; }
    public string ClientName { get; set; }
    public decimal Amount { get; set; }
}