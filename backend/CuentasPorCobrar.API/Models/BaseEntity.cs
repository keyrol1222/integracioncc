namespace CuentasPorCobrar.Models;

public enum Status
{
    Unknown = 0,
    Active,
    Deleted
}

public abstract class BaseEntity
{
    public int Id { get; set; }
    public Status Status { get; set; } = Status.Unknown;
}