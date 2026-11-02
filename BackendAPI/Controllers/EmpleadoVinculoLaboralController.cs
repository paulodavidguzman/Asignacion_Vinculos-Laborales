using Microsoft.AspNetCore.Mvc;
using BackendAPI.Data;
using BackendAPI.Models;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoVinculoLaboralController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpleadoVinculoLaboralController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Crear(
    EmpleadoVinculoLaboral modelo)
        {
            try
            {
                modelo.evl_id = 0;

                _context.empleado_vinculolaboral.Add(modelo);

                await _context.SaveChangesAsync();

                return Ok(modelo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Modificar(
     int id,
     [FromBody] ModificarVinculoLaboralDTO modelo)
        {
            var registro = await _context.empleado_vinculolaboral
                .FindAsync(id);

            if (registro == null)
                return NotFound();

            registro.vl_id = modelo.vl_id;
            registro.evl_temporal = modelo.evl_temporal;
            registro.evl_fecha_desde = modelo.evl_fecha_desde;
            registro.evl_fecha_hasta = modelo.evl_fecha_hasta;
            registro.evl_fecha_modifico = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(registro);
        }

        [HttpPut("anular/{id}")]
        public async Task<IActionResult> Anular(int id)
        {
            var registro = await _context.empleado_vinculolaboral
                .FindAsync(id);

            if (registro == null)
                return NotFound();

            registro.evl_anulado = true;
            registro.evl_estado = false;
            registro.evl_fecha_modifico = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}