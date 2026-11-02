
using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Models 
{
    public class VinculoLaboral
    {
        [Key]
        public int vl_id { get; set; }
        public int vl_hsSemanales { get; set; }
        public int vl_cant_dias { get; set; }
        public string vl_descripcion { get; set; }
        public bool vl_anulado { get; set; }
    }
}
