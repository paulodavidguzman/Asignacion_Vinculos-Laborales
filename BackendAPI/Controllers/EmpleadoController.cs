using Microsoft.AspNetCore.Mvc;
using BackendAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpleadoController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetEmpleados()
        {
            var lista = await (
                from e in _context.empleado

                join evl in _context.empleado_vinculolaboral
                    on e.emp_id equals evl.emp_id into tempEvl

                from evl in tempEvl
                    .Where(x => x.evl_anulado == false)
                    .DefaultIfEmpty()

                join vl in _context.vinculolaboral
                    on evl.vl_id equals vl.vl_id into tempVl

                from vl in tempVl.DefaultIfEmpty()

                where e.emp_anulado == false

                select new Models.EmpleadoListadoDTO
                {
                    emp_id = e.emp_id,
                    emp_nombre = e.emp_nombre,
                    emp_apellido = e.emp_apellido,
                    emp_nrodocumento = e.emp_nrodocumento,

                    vinculo = vl != null
                        ? vl.vl_descripcion
                        : "",

                    estado = evl != null
                        ? evl.evl_estado
                        : null,

                    evl_id = evl != null
                        ? evl.evl_id
                        : null,

                    vl_id = evl != null
                        ? evl.vl_id
                        : null,

                    evl_temporal = evl != null
                        ? evl.evl_temporal
                        : null,

                    evl_fecha_desde = evl != null
    ? evl.evl_fecha_desde
    : null,

                    evl_fecha_hasta = evl != null
    ? evl.evl_fecha_hasta
    : null
                }

            ).ToListAsync();

            return Ok(lista);
        }
    }
}