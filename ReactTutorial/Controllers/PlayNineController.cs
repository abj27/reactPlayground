using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactTutorial.Controllers
{
    public class PlayNineController : Controller
    {
        // GET: PlayNine
        public ActionResult Index()
        {
            return View();
        }

        // GET: PlayNine/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PlayNine/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PlayNine/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: PlayNine/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PlayNine/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: PlayNine/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PlayNine/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
