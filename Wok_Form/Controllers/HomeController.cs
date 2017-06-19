using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        private static Student[] _data0 = new Student[] {
                new Student() { Id = "0", Name = "Be The Bee0", Group = "NO-15-1" },
                new Student() { Id = "1", Name = "Soul Goodman0", Group = "NO-16-1" },
                new Student() { Id = "2", Name = "Mr. Freemen0", Group = "NO-17-1" },
                new Student() { Id = "3", Name = "Isaac Sandaval0", Group = "NO-18-1" },
                new Student() { Id = "4", Name = "William Taggart0", Group = "NO-19-1" },
                new Student() { Id = "5", Name = "David Sharif0", Group = "NO-20-1" },
                new Student() { Id = "6", Name = "Hugh Darroy0", Group = "NO-21-1" },
                new Student() { Id = "7", Name = "Elisa Cassan0", Group = "NO-22-1" },
                new Student() { Id = "8", Name = "El Capitano0", Group = "NO-23-1" },
            };

        private static Student[] _data1 = new Student[] {
                new Student() { Id = "0", Name = "Be The Bee1", Group = "NO-15-1" },
                new Student() { Id = "1", Name = "Soul Goodman1", Group = "NO-16-1" },
                new Student() { Id = "2", Name = "Mr. Freemen1", Group = "NO-17-1" },
                new Student() { Id = "3", Name = "Isaac Sandaval1", Group = "NO-18-1" },
                new Student() { Id = "4", Name = "William Taggart1", Group = "NO-19-1" },
                new Student() { Id = "5", Name = "David Sharif1", Group = "NO-20-1" },
                new Student() { Id = "6", Name = "Hugh Darroy1", Group = "NO-21-1" },
                new Student() { Id = "7", Name = "Elisa Cassan1", Group = "NO-22-1" },
                new Student() { Id = "8", Name = "El Capitano1", Group = "NO-23-1" },
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

        public ActionResult GetList0(string value)
        {
            value = value.ToLower();
            var result = _data0.Where(x => x.Name.ToLower().StartsWith(value));
            return Json(result);
        }

        public ActionResult GetList1(string value)
        {
            value = value.ToLower();
            var result = _data1.Where(x => x.Name.ToLower().StartsWith(value));
            return Json(result);
        }

        public string SubmitForm()
        {
            var res = new StringBuilder();
            res.Append(Request.Form["students"]?.Replace("},{", "}<br>{") ?? "NULL");
            res.Append("<br>---------------------<br>");
            res.Append(Request.Form["students0"]?.Replace("},{", "}<br>{") ?? "NULL");
            res.Append("<br>---------------------<br>");
            res.Append(Request.Form["students1"]?.Replace("},{", "}<br>{") ?? "NULL");
            return res.ToString();
        }
    }
}