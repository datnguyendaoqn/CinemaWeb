//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CinemaWeb.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Phim
    {
        [Required(ErrorMessage ="Khong duoc de trong")]
        public string MaPhim { get; set; }
        [Required(ErrorMessage = "Khong duoc de trong")]

        public string TenPhim { get; set; }
        public Nullable<int> ThoiLuong { get; set; }
        public string DaoDien { get; set; }
        public string TheLoai { get; set; }
        public Nullable<int> ID_Anh { get; set; }
        public string Mota { get; set; }
        public int ID { get; set; }
    
        public virtual Anh Anh { get; set; }
    }
}
