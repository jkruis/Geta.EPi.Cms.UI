using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using EPiServer;
using Newtonsoft.Json;

namespace Geta.EPi.Cms.UI.Integrations.Embedly
{
    public class EmbedlyWrapper
    {
        protected readonly HttpClient Client;
        private readonly string _embedlyApiUrl;
        private readonly string _embedlyApiKey;

        public EmbedlyWrapper(string apiUrl, string apiKey)
        {
            _embedlyApiUrl = apiUrl;
            _embedlyApiKey = apiKey;

            Client = new HttpClient();

        }

        public async Task<oEmbedResponse> oEmbed(string url)
        {
            var builder = new UrlBuilder(_embedlyApiUrl + "oembed");

            builder.QueryCollection.Add("url", url);
            builder.QueryCollection.Add("autoplay", "false");

            AddAuthentication(builder);

            HttpResponseMessage response = await Client.GetAsync(builder.ToString());
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<oEmbedResponse>(content);
        }

        private void AddAuthentication(UrlBuilder builder)
        {
            builder.QueryCollection.Add("key", _embedlyApiKey);
        }
    }

    public class oEmbedResponse
    {
        public oEmbedType Type { get; set; }
        public string Version { get; set; }
        public string Title { get; set; }

        [JsonProperty("Author_Name")]
        public string AuthorName { get; set; }

        [JsonProperty("Author_Url")]
        public string AuthorUrl { get; set; }

        [JsonProperty("Provider_Name")]
        public string ProviderName { get; set; }

        [JsonProperty("Provider_Url")]
        public string ProviderUrl { get; set; }

        [JsonProperty("Cache_Age")]
        public string CacheAge { get; set; }

        [JsonProperty("Thumbnail_Url")]
        public string ThumbnailUrl { get; set; }

        [JsonProperty("Thumbnail_Width")]
        public string ThumbnailWidth { get; set; }

        [JsonProperty("Thumbnail_Height")]
        public string ThumbnailHeight { get; set; }

        public string Description { get; set; }
        public string Url { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public string Html { get; set; }


        public string RenderMarkup()
        {
            if (Type == oEmbedType.Photo)
            {
                return "<img src=\"" + HttpUtility.UrlPathEncode(this.Url) + "\" width=\"" + HttpUtility.HtmlEncode(this.Width) + "\" height=\"" + HttpUtility.HtmlEncode(this.Height) + "\" alt=\"" + HttpUtility.HtmlEncode(this.Title) + "\" />";
            }

            return string.IsNullOrEmpty(this.Html) ? string.Empty : this.Html;
        }
    }

    public enum oEmbedType
    {
        Photo, Video, Link, Rich
    }
}