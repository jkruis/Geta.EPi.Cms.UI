using System.Web.Hosting;
using EPiServer.Framework.TypeScanner;
using EPiServer.Shell.Modules;

namespace Geta.EPi.Cms.UI
{
    public class Module : ShellModule
    {
        public Module(string name, string routeBasePath, string resourceBasePath) : base(name, routeBasePath, resourceBasePath)
        {
        }

        public Module(string name, string routeBasePath, string resourceBasePath, ITypeScannerLookup typeScannerLookup, VirtualPathProvider virtualPathProvider) : base(name, routeBasePath, resourceBasePath, typeScannerLookup, virtualPathProvider)
        {
        }
    }
}