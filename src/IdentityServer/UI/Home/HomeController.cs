using Microsoft.AspNet.Mvc;

namespace IdentityServer.UI.Home
{
    public class HomeController : Controller
    {
        [Route("/")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
