using CuentasPorCobrar.Models;
using CuentasPorCobrar.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CuentasPorCobrar.Controllers;

[ApiController]
[Route("[Controller]")]
public class TipoDocumentsController(ApplicationDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ICollection<TipoDocument>>> GetTipoDocuments() =>
        Ok(await dbContext.TipoDocuments.ToListAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<TipoDocument>> GetTipoDocument(int id)
    {
        var tipoDocument = await dbContext.TipoDocuments.FindAsync(id);

        if (tipoDocument is null)
        {
            return NotFound();
        }

        return Ok(tipoDocument);
    }

    [HttpPost]
    public async Task<ActionResult<TipoDocument>> CreateTipoDocument(TipoDocument tipoDocument)
    {
        await dbContext.TipoDocuments.AddAsync(tipoDocument);
        await dbContext.SaveChangesAsync();

        return Ok(tipoDocument);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TipoDocument>> UpdateTipoDocument(int id, TipoDocument updatedTipoDocument)
    {
        if (id != updatedTipoDocument.Id)
        {
            return BadRequest();
        }

        var tipoDocument = await dbContext.TipoDocuments.FindAsync(id);

        if (tipoDocument is null)
        {
            return NotFound();
        }

        dbContext.TipoDocuments.Update(updatedTipoDocument);
        await dbContext.SaveChangesAsync();

        return Ok(updatedTipoDocument);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<TipoDocument>> DeleteTipoDocument(int id)
    {
        var tipoDocument = await dbContext.TipoDocuments.FindAsync(id);

        if (tipoDocument is null)
        {
            return NotFound();
        }

        dbContext.TipoDocuments.Remove(tipoDocument);
        await dbContext.SaveChangesAsync();

        return Ok(tipoDocument);
    }
}