# Cignium Hypermedia Client

Hypermedia renderer for Cignium's hypermedia api.

## Install

The library is available on NPM and hosted on CDN.

### NPM

To install the stable version, run:

```
npm install cignium-hypermedia --save
```

### CDN

Add the following script tag:

```html
<script src="https://cdn.jsdelivr.net/cignium-hypermedia/latest/client.min.js"></script>
```

## Get Started

Add the following script tag in your HTML page:

```html
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    Cignium.init('INSERT_ELEMENT_ID', 'INSERT_URL')
  })
</script>
```
