namespace BackendAPI.Models
{
    public class EmpleadoListadoDTO
    {
        public int emp_id { get; set; }

        public string emp_nombre { get; set; }

        public string emp_apellido { get; set; }

        public string emp_nrodocumento { get; set; }

        public string? vinculo { get; set; }

        public bool? estado { get; set; }

        // NUEVOS

        public int? evl_id { get; set; }

        public int? vl_id { get; set; }

        public bool? evl_temporal { get; set; }

        public DateTime? evl_fecha_desde { get; set; }
        public DateTime? evl_fecha_hasta { get; set; }
    }
}