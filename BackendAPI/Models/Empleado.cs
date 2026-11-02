using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Models

{
    public class Empleado
    {
        [Key]
        public int emp_id { get; set; }
        public string emp_nombre { get; set; }
        public string emp_apellido { get; set; }
        public string emp_nrodocumento { get; set; }
        public bool emp_anulado { get; set; }
    }
}
