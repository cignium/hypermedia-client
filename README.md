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

For default styling, include this tag:

```html
<link rel="stylesheet" type="text/css" href="//npmcdn.com/cignium-hypermedia-client/dist/default.css">
```

## Get Started

Initializing the client can be done in two ways, **programmatically** by calling `Cignium.init()` or **declaratively** by adding attributes to an existing HTML-element.

### Programmatically

#### Single Instance

Add the following script tag in your HTML page:

```html
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    Cignium.init('ELEMENT' [, 'CONFIGURATION'])
    Cignium.navigate('URL')
  })
</script>
```

There are four methods available on the global `Cignium` object: `init`, `navigate`, `get` and `set`.

**init** accepts two parameters:

* `element`: mandatory parameter pointing out the element that the client will inject the rendered output into. Can be either the `id` of the element as a string or the actual element object.
* `configuration`: optional configuration object. Further explained under [Configuration](#configuration).

**navigate** accepts one parameter:

* `href`: the url to the endpoint that should be rendered.

**get** accepts one optional parameter
+ `propertyName`: name of the property to retrieve. If the parameter is omitted, the method returns an object representation of all the fields in the current form.

**set** accepts two parameters
+ `propertyName`: name of the property to set.
+ `value`: new value of the property.

### Multiple Instances

To render multiple instances of the client, add the following script tag in your HTML page:

```html
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    var client1 = new Cignium.Client(['CONFIGURATION'])
    var client2 = new Cignium.Client(['CONFIGURATION'])

    client1.init('ELEMENT')
    client2.init('ELEMENT')

    client1.navigate('URL')
    client2.navigate('URL')
  })
</script>
```

There is one constructor available on the global `Cignium` object: `Client` The constructor accepts one parameter:

* `configuration`: optional configuration object. Further explained under [Configuration](#configuration).

Creating an instance will return an object with the two methods: `init`, `navigate`, `get` and `set`.

**init** accepts one parameters:

* `element`: mandatory parameter pointing out the element that the client will inject the rendered output into. Can be either the `id` of the element as a string or the actual element object.

**navigate**, **get** and **set** behave as the ones on the global `Cignium` object.

### Declaratively

Add the following to your HTML page:

*NOTE: You cannot render multiple instances declaratively.*

```html
<div data-endpoint="URL"></div>
```

By adding the `data-endpoint` attribute to an element on the page, you are telling the client to inject the rendered output into that element. The value provided to the attribute should be the URL to the API endpoint that the client should render.

Further configuration can be done by adding attributes to the element. See [Configuration](#configuration) for available options.

### <a name="configuration"></a>Configuration

There are two ways to configure the renderer, depending on which way the client is initialized, programmatically or declaratively.

* Adding attributes to the element with the `data-endpoint` attribute.
* Providing a configuration object as the second parameter to the `Cignium.init` function.

Attributes should be provided in dash-casing **with** the data-prefix, e.g. `data-disable-default-styling`.
Properties should be provided in camel-casing **without** the data-prefix, e.g. `disableDefaultStyling`.

| Attribute  | Configuration property | Value type | Description |
| ---------- | ---------------------- | ---------- | ----------- |
| `data-endpoint` | `endpoint` | string | Specifies the starting point of the API that should be rendered. |
| `data-action-list-position` | `actionListPosition` | string | Specifies the position of the action buttons. Accepted values are: `top` (default), `bottom` and `both`. |
| | `onValueChange` | function | Callback function executed after a value has been updated. The callback receives 2 parameters: `id` (of the updated element) and `value` (after the change). |
| | `onUrlChange` | function | Callback function executed after the url has changed. Receives 1 parameter: `url` (after the navigation). |
| | `onRedirect` | function | Callback function executed when the client will attempt a redirect. Receives 2 parameters: `url` (where the client would normally redirect) and `content` (of that url). If the function exists, the client will NOT automatically redirect. Optional return value: `{ title, content }`. |
| | `onError` | function | Callback function executed when an error occurs. Receives 1 parameter: `error`. |
| | `onLoading` | function | Callback function executed when the client start loading. Does not receives parameters. |
| | `onLoaded` | function | Callback function executed when the client has loaded. Does not receives parameters. |
| `data-debug` | `debug` | boolean | When enabled, the debug view will be visible, showing the data recieved from the server. |

### Styling

We provide a default styling via the `default.css` file. Include this file in your page to get the default styling or write your own styling from scratch.

The renderer is exposing a number of CSS classes for you to override when you want to customize
the appearance of the rendered output.

The following classes are available (this documentation is a work in progress,
information about the different CSS-classes and how to use them will be updated.
For now, you can use the Developer Tools in your browser to see which CSS-classes are connected to the element you wish to style):
 * ct-app
 * ct-error-tooltip
 * ct-json-debugger
 * ct-error-container
 * ct-error-message
 * ct-error-list
 * ct-error-list-message
 * ct-document
 * ct-document-header
 * ct-document-header-text
 * ct-document-footer
 * ct-activity-indicator
 * ct-section
 * ct-element
 * ct-element-label
 * ct-link
 * ct-content
 * ct-action-list
 * ct-action
 * ct-checkbox
 * ct-radio
 * ct-date-picker
 * ct-dropdown-list
 * ct-input
 * ct-input-invalid
 * ct-multiline-text-input
 * ct-number-input
 * ct-text-input
 * ct-checkbox-list
 * ct-radio-list
 * ct-checkbox-option
 * ct-radio-option
 * ct-checkbox-label
 * ct-radio-label
 * ct-list
 * ct-list-item
 * ct-sitemap

## Contributing

[Semantic Release](https://github.com/semantic-release/semantic-release) is used for releasing and semantic versioning. Make sure you follow the [default commit message format](https://github.com/semantic-release/semantic-release#default-commit-message-format) in order for releases to be properly created.

## License

MIT
