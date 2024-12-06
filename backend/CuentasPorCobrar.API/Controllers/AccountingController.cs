using System.Text;
using System.Text.Json;
using CuentasPorCobrar.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace CuentasPorCobrar.Controllers;

[ApiController]
[Route("[Controller]")]
public class AccountingController(HttpClient httpClient) : ControllerBase
{
    const string URL = "http://integracion.somee.com/api";
    private readonly JsonSerializerOptions jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    [HttpGet("{document}")]
    public async Task<IActionResult> GetTransaction(string document)
    {
        try
        {
            var response = await httpClient.GetAsync($"{URL}/historial-crediticio/{document}");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var responseData = await response.Content.ReadAsStringAsync();
            return Ok(JsonSerializer.Deserialize<CreditHistoryDto>(responseData, jsonOptions));
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, $"Error fetching data: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] CreditHistoryDto requestData)
    {
        try
        {
            var jsonContent = new StringContent(JsonSerializer.Serialize(requestData), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync($"{URL}/historial-crediticio", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var responseData = await response.Content.ReadAsStringAsync();
            return Ok(JsonSerializer.Deserialize<CreditHistoryDto>(responseData, jsonOptions));
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, $"Error posting data: {ex.Message}");
        }
    }
}