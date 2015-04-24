# Geta.EPi.Cms.UI
This is a library of custom editors for EPiServer.

## Installation

Install NuGet package (use Geta NuGet feed).

    Install-Package Geta.EPi.Cms.UI

## Currently available editors

### Font Awesome auto complete editor

    [FontAwesomeSelection]
    [UIHint(GetaUIHint.FontAwesomeIcon)]
    public virtual string IconCssClass { get; set; }
