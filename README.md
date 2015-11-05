# Cignium Hypermedia Client

Hypermedia renderer for Cignium's hypermedia api.

[![Build Status](https://travis-ci.org/cignium/hypermedia-client.svg)](https://travis-ci.org/cignium/hypermedia-client)

## Install

The library is available on NPM and hosted on CDN.

##### NPM

To install the stable version, run:

```
npm install cignium-hypermedia-client --save
```

##### CDN

Add the following script tag:

```html
<script src="//npmcdn.com/cignium-hypermedia-client/dist/client.min.js"></script>
```

## Get Started

Add the following script tag in your HTML page:

```html
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    Cignium.init('INSERT_ELEMENT_ID')
    Cignium.navigate('INSERT_URL')
  })
</script>
```

## Contributing

[Semantic Release](https://github.com/semantic-release/semantic-release) is used for releasing and semantic versioning. Make sure you follow the [default commit message format](https://github.com/semantic-release/semantic-release#default-commit-message-format) in order for releases to be properly created.

## License

MIT
