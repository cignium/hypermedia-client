# Cignium Hypermedia Client

Hypermedia renderer for Cignium's hypermedia api.

[![Build Status](https://travis-ci.org/cignium/hypermedia-client.svg)](https://travis-ci.org/cignium/hypermedia-client)

## Install

The library is available on NPM and hosted on CDN.

### NPM

To install the stable version, run:

```
npm install cignium-hypermedia-client --save
```

### CDN

Add the following script tag:

```html
<script src="//npmcdn.com/cignium-hypermedia-client/dist/client.min.js"></script>
```

## Get Started

Initializing the client can be done in two ways, **programmatically** by calling `Cignium.init()` 
or **declaratively** by adding attributes to an existing HTML-element.

### Programmatically
 
Add the following script tag in your HTML page:

```html
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    Cignium.init('ELEMENT' [, 'CONFIGURATION'])
    Cignium.navigate('URL')
  })
</script>
```

There are two methods available on the global `Cignium` object: `init` and `navigate`.

**Init** accepts two parameters, `element` and `configuration`
 * **Element**: Mandatory parameter pointing out the element that the client will inject the rendered output into.
 Can be either the id of the element as a string or the actual element object.
 * **Configuration**: Optional configuration object. Further explained under [Configuration](#configuration)
 
**Navigate** accepts a single parameter: the URL to the API endpoint that should be rendered.

### Declaratively

Add the following to your HTML page:

```html
<div data-endpoint="URL"></div>
```

By adding the `data-endpoint` attribute to an element on the page, you are telling the client to inject the 
rendered output into that element. The value provided to the attribute should be the URL to the API endpoint 
that the client should render.

Further configuration can be done by adding attributes to the element. See [Configuration](#configuration) for 
available options.


### <a name="configuration"></a>Configuration

There are two ways to configure the renderer, 
depending on which way the client is initialized, programmatically or declaratively.
 * Adding attributes to the element with the `data-endpoint` attribute.
 * Providing a configuration object as the second parameter to the `Cignium.init` function.
 
Attributes should be provided in dash-casing **with** the data-prefix, e.g. `data-disable-default-styling`.
Properties should be provided in camel-casing **without** the data-prefix, e.g. `disableDefaultStyling`.

| Attribute  | Configuration property | Value type | Description |
| ---------- | ---------------------- | ---------- | ----------- | 
| `data-endpoint`  | `endpoint`  | string | Specifies the starting point of the API that should be rendered. |
| `data-disable-default-styling` | `disableDefaultStyling` | none/bool | When the attribute is present or the setting is set to true, the default styling is disabled to allow for more control over the styling customization. |

### Overridable CSS classes

The renderer is exposing a number of CSS classes for you to override when you want to customize 
the appearance of the rendered output.

The following classes are available (this documentation is a work in progress, 
information about the different CSS-classes and how to use them will be updated. For now, you can use the Developer Tools in your browser to see which CSS-classes are connected to the element you wish to style):
 * ct-app
 * ct-error-tooltip
 * ct-json-debugger
 * ct-error-message
 * ct-document
 * ct-document-header
 * ct-document-header-text
 * ct-activity-indicator
 * ct-section
 * ct-element
 * ct-element-label
 * ct-link
 * ct-content
 * ct-action-list
 * ct-action
 * ct-checkbox
 * ct-date-picker
 * ct-dropdown-list
 * ct-input
 * ct-input-invalid
 * ct-multiline-text-input
 * ct-number-input
 * ct-text-input
 * ct-checkbox-list
 * ct-radio-list
 * ct-list
 * ct-list-item
 * ct-sitemap

## Contributing

[Semantic Release](https://github.com/semantic-release/semantic-release) is used for releasing and semantic versioning. Make sure you follow the [default commit message format](https://github.com/semantic-release/semantic-release#default-commit-message-format) in order for releases to be properly created.

## License

MIT
