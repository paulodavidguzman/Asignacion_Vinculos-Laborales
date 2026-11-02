
namespace BackendAPI.Models
{
    public class ModificarVinculoLaboralDTO
    {
        public int vl_id { get; set; }
        public bool evl_temporal { get; set; }
        public DateTime evl_fecha_desde { get; set; }
        public DateTime? evl_fecha_hasta { get; set; }
    }
}
