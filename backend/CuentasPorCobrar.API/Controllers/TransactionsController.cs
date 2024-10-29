using CuentasPorCobrar.Models;
using CuentasPorCobrar.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuentasPorCobrar.Controllers;

[ApiController]
[Route("[Controller]")]
public class TransactionsController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ICollection<Transaction>>> GetTransactions() =>
        Ok(await dbContext.Transactions.ToListAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Transaction>> GetTransaction(int id)
    {
        var transaction = await dbContext.Transactions.FindAsync(id);

        if (transaction is null)
        {
            return NotFound();
        }

        return Ok(transaction);
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