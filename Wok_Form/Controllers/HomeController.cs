using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wok_Form.Models;

namespace Wok_Form.Controllers {
    public class HomeController : Controller {

        private static Student[] _data = new Student[] {
                new Student() { Id = "0", Name = "Be The Bee", Group = "NO-15-1" },
                new Student() { Id = "1", Name = "Soul Goodman", Group = "NO-16-1" },
                new Student() { Id = "2", Name = "Mr. Freemen", Group = "NO-17-1" },
                new Student() { Id = "3", Name = "Isaac Sandaval", Group = "NO-18-1" },
                new Student() { Id = "4", Name = "William Taggart", Group = "NO-19-1" },
                new Student() { Id = "5", Name = "David Sharif", Group = "NO-20-1" },
                new Student() { Id = "6", Name = "Hugh Darroy", Group = "NO-21-1" },
                new Student() { Id = "7", Name = "Elisa Cassan", Group = "NO-22-1" },
                new Student() { Id = "8", Name = "El Capitano", Group = "NO-23-1" },
            };

        public ActionResult Index() {
            return View();
        }

        public ActionResult About() {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult GetList(string value) {
            value = value.ToLower();
            var result = _data.Where(x => x.Name.ToLower().StartsWith(value));
            return Json(result);
        }

        public string SubmitForm()
        {
            return Request.Form["students"]?.Replace("},{", "}<br>{") ?? "NULL";
        }
    }
}