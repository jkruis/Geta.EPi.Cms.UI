using System.Configuration;
using System.Reflection;
using System.Web.Http;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.Framework.Localization;
using EPiServer.Framework.Localization.XmlResources;
using EPiServer.ServiceLocation;
using Geta.EPi.Cms.UI.Integrations.Embedly;
using StructureMap;

namespace Geta.EPi.Cms.UI
{
    [ModuleDependency(typeof(ServiceContainerInitialization))]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    [InitializableModule]
    public class InitializationModule : IConfigurableModule
    {
        private const string LocalizationProviderName = "Geta.EPi.Cms.UI.EmbeddedLangFiles";

        public void Initialize(InitializationEngine context)
        {
            AddLocalizationProvider(context);
            ConfigureHttpRoutes();
        }

        private void AddLocalizationProvider(InitializationEngine context)
        {
            var localizationService = context.Locate.Advanced.GetInstance<LocalizationService>() as ProviderBasedLocalizationService;

            if (localizationService != null)
            {
                var localizationProviderInitializer = new EmbeddedXmlLocalizationProviderInitializer();
                XmlLocalizationProvider localizationProvider = localizationProviderInitializer.GetInitializedProvider(LocalizationProviderName, new []{ Assembly.GetExecutingAssembly() });

                //Inserts the provider first in the provider list so that it is prioritized over default providers.
                localizationService.Providers.Insert(0, localizationProvider);
            }
        }

        public void Uninitialize(InitializationEngine context)
        {
        }

        public void Preload(string[] parameters)
        {
        }

        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Container.Configure(ConfigureContainer);
        }

        private static void ConfigureContainer(ConfigurationExpression container)
        {
            container.For<EmbedlyWrapper>()
                .Use<EmbedlyWrapper>()
                .Ctor<string>("apiUrl")
                .Is(ConfigurationManager.AppSettings["Embedly:ApiUrl"])
                .Ctor<string>("apiKey")
                .Is(ConfigurationManager.AppSettings["Embedly:ApiKey"]);
        }

        private static void ConfigureHttpRoutes()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                "embedlyApiWrapper",
                "api/oembed/{action}",
                new { controller = "oEmbedMeta", action = "get" }
            );
        }
    }
}