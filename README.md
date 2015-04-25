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

### String list editor

This is the same one that's included in Alloy templates package.

    [StringList]
    [UIHint(GetaUIHint.StringList)]
    public virtual string[] StringList { get; set; }
