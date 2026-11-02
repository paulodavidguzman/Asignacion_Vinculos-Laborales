
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    public class EmpleadoVinculoLaboral
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int evl_id { get; set; }

        public int emp_id { get; set; }
        public int vl_id { get; set; }
        public bool evl_temporal { get; set; }
        public DateTime evl_fecha_desde { get; set; }
        public DateTime? evl_fecha_hasta { get; set; }
        public int? evl_empid_modifico { get; set; }
        public DateTime? evl_fecha_modifico { get; set; }
        public bool evl_estado { get; set; }
        public bool evl_anulado { get; set; }
    }
}
