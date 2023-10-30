using CinemaWeb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaWeb.Controllers
{
    public class FilmController : Controller
    {
        // GET: User
        CinemaTestEntities DB = new CinemaTestEntities();
        public ActionResult Index(bool? UseLayout)
        {
            if(UseLayout.HasValue && !UseLayout.Value) 
            {
                ViewBag.Layout = false;
            }
            return View(DB.Phims);
        }
        public ActionResult Detail(string id)
        {
            var phim = DB.Phims.Find(id);
            var anh = DB.Anhs.Find(phim.ID_Anh);
            var phimanh = new PhimAnhModel() { Anh = anh ,Phim = phim };
            return PartialView("_Filmdetail",phimanh);
        }
        [HttpPost]
        public ActionResult Add(Phim model,HttpPostedFileBase Image) 
        {
                if(Image != null)
                {
                var filename = Image.FileName;
                var newname = Guid.NewGuid().ToString() + Path.GetExtension(filename);
                var relativepath = Path.Combine("~/Content/Image/",newname);
                Image.SaveAs(Server.MapPath(relativepath));
                Anh anh = new Anh();
                anh.Image_path = relativepath;
                anh.Image_type = "Movie";
                DB.Anhs.Add(anh);
                DB.SaveChanges();
                model.ID_Anh = anh.ID;
                }
                DB.Phims.Add(model);
                DB.SaveChanges();
                return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult Delete(string id)
        {
            var kq = DB.Phims.Find(id);
            DB.Phims.Remove(kq);
            DB.SaveChanges();
            if (Request.IsAjaxRequest()) 
            {
                return RedirectToAction("Index", new {UseLayout = false});
            }
            return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult Edit(Phim model,HttpPostedFileBase Image)
        {
            var obj = DB.Phims.Find(model.MaPhim);
            obj.TenPhim = model.MaPhim;
            obj.ThoiLuong=model.ThoiLuong;
            obj.DaoDien=model.DaoDien;
            obj.TheLoai = model.TheLoai;
            obj.Mota=model.Mota;
            if(Image!=null) 
            {
                var filename = Image.FileName;
                var newname = Guid.NewGuid().ToString() + Path.GetExtension(filename);
                var relativepath = Path.Combine("~/Content/Image/", newname);
                Image.SaveAs(Server.MapPath(relativepath)); 
                var anh = new Anh() { Image_path = relativepath,Image_type="Movie" };
                DB.Anhs.Add(anh);
                DB.SaveChanges();
                obj.ID_Anh = anh.ID; 
            }
            DB.Entry(obj).State = System.Data.Entity.EntityState.Modified;
            DB.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}