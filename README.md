## Sample Proxy for Splunk HTTP Event Collector (Beta)
[Splunk HTTP Event Collector](http://dev.splunk.com/view/SP-CAAAE6P) supports token-based authentication via HTTP `Authorization` header. This Node.js proxy enables integration with Splunk HTTP Collector of 3rd party notification systems that do not send authentication token via request header but rather via a query parameter.

[Azure Alerts](https://azure.microsoft.com/en-us/documentation/articles/insights-webhooks-alerts/) webhooks are one such example.

### Getting Started
* Install with Node.js package manager [npm](http://npmjs.org/):

        $ npm install

* Configure your proxy HTTP/HTTPS ports and SSL certs by changing HTTP_PORT, HTTPS_PORT, and SSL_OPTS variables at the top of server.js file.
	
	This configuration step can be skipped for **test & dev purposes**. By default, the server binds to ports 8090 and 4443 for HTTP/HTTPS traffic. It also uses self-signed certificates for SSL under `.ssl/` directory, so we recommend you replace them with real certificates for a secure production solution.

* Start the proxy by typing:

		$ make server
		
	If you have configured server ports to standard ports 80 and 443, you'll need to `sudo node server.js` to start the server as root unless you have rights to bind to privileged ports < 1024
	
	You should see something similar to:

    	Listening to HTTP on port 8090
    	Listening to HTTPS on port 4443

