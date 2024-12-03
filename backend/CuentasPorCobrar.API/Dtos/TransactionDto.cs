using CuentasPorCobrar.Models;

namespace CuentasPorCobrar.Dtos;

public class TransactionDto
{
    public int Id { get; set; }
    public required string TypeMovement { get; set; }
    public int TypeDocumentId { get; set; }
    public string TypeDocumentAccount { get; set; } = null!;
    public int NumberDocument { get; set; }
    public DateTimeOffset Date { get; set; }
    public int ClientId { get; set; }
    public string ClientName { get; set; } = null!;
    public decimal Amount { get; set; }
    public Status Status { get; set; }
}