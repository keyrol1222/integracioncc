using CuentasPorCobrar.Models;
using CuentasPorCobrar.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuentasPorCobrar.Controllers;

[ApiController]
[Route("[Controller]")]
public class BalancesController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ICollection<Balances>>> GetBalances() =>
        Ok(await dbContext.Balances.ToListAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Balances>> GetBalances(int id)
    {
        var balances = await dbContext.Balances.FindAsync(id);

        if (balances is null)
        {
            return NotFound();
        }

        return Ok(balances);
    }

    [HttpPost]
    public async Task<ActionResult<Balances>> CreateBalances(Balances balances)
    {
        await dbContext.Balances.AddAsync(balances);
        await dbContext.SaveChangesAsync();

        return Ok(balances);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Balances>> UpdateBalances(int id, Balances updatedBalances)
    {
        if (id != updatedBalances.Id)
        {
            return BadRequest();
        }

        var balances = await dbContext.Balances.FindAsync(id);

        if (balances is null)
        {
            return NotFound();
        }

        dbContext.Balances.Update(updatedBalances);
        await dbContext.SaveChangesAsync();

        return Ok(updatedBalances);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Balances>> DeleteBalances(int id)
    {
        var balances = await dbContext.Balances.FindAsync(id);

        if (balances is null)
        {
            return NotFound();
        }

        dbContext.Balances.Remove(balances);
        await dbContext.SaveChangesAsync();

        return Ok(balances);
    }
}