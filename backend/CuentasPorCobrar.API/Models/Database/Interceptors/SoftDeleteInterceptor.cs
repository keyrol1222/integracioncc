using CuentasPorCobrar.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

public class SoftDeleteInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        ConvertDeleteOperationsToSoftDelete(eventData.Context!);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        ConvertDeleteOperationsToSoftDelete(eventData.Context!);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void ConvertDeleteOperationsToSoftDelete(DbContext context)
    {
        foreach (var entry in context.ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                entry.Entity.Status = Status.Deleted;
            }
        }
    }
}
