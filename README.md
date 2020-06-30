# Varnish Indicator Browser Extension

This is a Browser Extension to quickly reference if a page was served from Varnish Cache.

The extension has the following states:

<img src="img/grey.png" width="16"> Varnish could not be found.

<img src="img/blue.png" width="16"> Varnish is present.

<img src="img/green.png" width="16"> Cache hit.

<img src="img/red.png" width="16"> Cache miss.

## Headers

The extension will look for the `x-varnish-cache` or `x-varnish` headers. If found, it marks Varnish as present.

If `x-varnish-cache` is `hit`, it marks Varnish as hit.

If `x-varnish-cache` is `miss`, it marks Varnish as miss.

If `x-varnish-cache` can't be found, it will inspect `x-varnish`. If it has two ids (i.e. `273036 732728`), it marks Varnish as hit. If it has only one id (i.e. `273036`), it marks Varnish as miss.
