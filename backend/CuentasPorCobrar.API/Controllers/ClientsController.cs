using CuentasPorCobrar.Models;
using CuentasPorCobrar.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuentasPorCobrar.Controllers;

[ApiController]
[Route("[Controller]")]
public class ClientsController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ICollection<Client>>> GetClients() =>
        Ok(await dbContext.Clients.ToListAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetClient(int id)
    {
        var client = await dbContext.Clients.FindAsync(id);

        if (client is null)
        {
            return NotFound();
        }

        return Ok(client);
    }

    [HttpPost]
    public async Task<ActionResult<Client>> CreateClient(Client client)
    {
        await dbContext.Clients.AddAsync(client);
        await dbContext.SaveChangesAsync();

        return Ok(client);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Client>> UpdateClient(int id, Client updatedClient)
    {
        if (id != updatedClient.Id)
        {
            return BadRequest();
        }

        var client = await dbContext.Clients.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);

        if (client is null)
        {
            return NotFound();
        }

        dbContext.Clients.Update(updatedClient);
        await dbContext.SaveChangesAsync();

        return Ok(updatedClient);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Client>> DeleteClient(int id)
    {
        var client = await dbContext.Clients.FindAsync(id);

        if (client is null)
        {
            return NotFound();
        }

        dbContext.Clients.Remove(client);
        await dbContext.SaveChangesAsync();

        return Ok(client);
    }
}