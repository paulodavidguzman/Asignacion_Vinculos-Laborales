using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VinculoLaboralController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VinculoLaboralController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetVinculos()
        {
            var lista = await _context.vinculolaboral
                .Where(x => x.vl_anulado == false)
                .ToListAsync();

            return Ok(lista);
        }
    }
}
