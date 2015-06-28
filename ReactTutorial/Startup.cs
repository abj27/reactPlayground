using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ReactTutorial.Startup))]
namespace ReactTutorial
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
