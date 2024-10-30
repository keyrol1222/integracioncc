using CuentasPorCobrar.Dtos;
using CuentasPorCobrar.Models;
using CuentasPorCobrar.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuentasPorCobrar.Controllers;

[ApiController]
[Route("[Controller]")]
public class TransactionsController(ApplicationDbContext dbContext) : ControllerBase
{
    private static TransactionDto GetDto(Transaction transaction) =>
        new()
        {
            Id = transaction.Id,
            TypeMovement = transaction.TypeMovement,
            TypeDocumentId = transaction.TypeDocumentId,
            TypeDocumentAccount = transaction.TypeDocument!.Cuenta,
            NumberDocument = transaction.NumberDocument,
            Date = transaction.Date,
            ClientId = transaction.ClientId,
            ClientName = transaction.Client!.Name,
            Amount = transaction.Amount,
        };

    [HttpGet]
    public ActionResult<ICollection<TransactionDto>> GetTransactions() =>
        Ok(dbContext.Transactions.Include(t => t.Client).Include(t => t.TypeDocument).Select(GetDto).ToList());

    [HttpGet("{id}")]
    public async Task<ActionResult<TransactionDto>> GetTransaction(int id)
    {
        var transaction = await dbContext.Transactions
            .Include(t => t.Client)
            .Include(t => t.TypeDocument)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (transaction is null)
        {
            return NotFound();
        }

        return Ok(GetDto(transaction));
    }

    [HttpPost]
    public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
    {
        await dbContext.Transactions.AddAsync(transaction);
        await dbContext.SaveChangesAsync();

        return Ok(transaction);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Transaction>> UpdateTransaction(int id, Transaction updatedTransaction)
    {
        if (id != updatedTransaction.Id)
        {
            return BadRequest();
        }

        var transaction = await dbContext.Transactions.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);

        if (transaction is null)
        {
            return NotFound();
        }

        dbContext.Transactions.Update(updatedTransaction);
        await dbContext.SaveChangesAsync();

        return Ok(updatedTransaction);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Transaction>> DeleteTransaction(int id)
    {
        var transaction = await dbContext.Transactions.FindAsync(id);

        if (transaction is null)
        {
            return NotFound();
        }

        dbContext.Transactions.Remove(transaction);
        await dbContext.SaveChangesAsync();

        return Ok(transaction);
    }
}