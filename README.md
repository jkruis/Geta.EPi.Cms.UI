# Geta.EPi.Cms.UI
This is a library of custom editors for EPiServer.

## Installation

Install NuGet package (use Geta NuGet feed).

    Install-Package Geta.EPi.Cms.UI

## Currently available editors

### Font Awesome selection/autocomplete editor

Adds ability to search and browse through all Font Awesome icons. Currently based on version 4.3.0.

    [FontAwesomeSelection]
    [UIHint(GetaUIHint.FontAwesomeIcon)]
    public virtual string IconCssClass { get; set; }

![ScreenShot](/docs/fontawesome-autocomplete.jpg)

### Key/value list editor

    [KeyValueList]
    [UIHint(GetaUIHint.KeyValueList)]
    public virtual IEnumerable<KeyValuePair<string, string>> KeyValues { get; set; }

![ScreenShot](/docs/keyvaluelist.jpg)

Default display template shipped in package:

    @model IEnumerable<KeyValuePair<string, string>>
    
    @if (Model != null && Model.Any())
    {
        <dl class="@ViewData["ListCssClass"]">
            @foreach (KeyValuePair<string, string> item in Model)
            {
                <dt>@item.Key</dt>
                <dd>@item.Value</dd>
            }
        </dl>
    }

### Google Place selection editor

Editor to search for a Place in Google maps.

    [GooglePlaceSelection]
    public virtual GooglePlace MyPlace { get; set; }
    
![ScreenShot](/docs/google-place-selection.jpg)

A basic display template is also installed at ~/Views/Shared/DisplayTemplates/GooglePlace.cshtml

### String list editor

This is the same one that's included in Alloy templates package.

    [StringList]
    [UIHint(GetaUIHint.StringList)]
    public virtual string[] StringList { get; set; }
