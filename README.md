## Sample Proxy for Splunk HTTP Event Collector (Beta)
[Splunk HTTP Event Collector](http://dev.splunk.com/view/SP-CAAAE6P) supports token-based authentication via HTTP `Authorization` header. This Node.js reverse proxy enables integration with Splunk HTTP Event Collector (HEC) of 3rd party notification systems that do not send authentication token via request header but rather via a query parameter. Examples include:

* [Heroku deploy hooks] (https://devcenter.heroku.com/articles/deploy-hooks)
* [Azure Alerts webhooks](https://azure.microsoft.com/en-us/documentation/articles/insights-webhooks-alerts/)
* [Atlassian webhooks] (https://developer.atlassian.com/jiradev/jira-apis/webhooks)

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

* Send request to proxy with JSON payload and required query parameters `hec_token` and `hec_host`:

	POST "http://< proxy_url >:8090/services/collector?hec_token=< hec_token >&hec_host=< hec_host >"
	where:
	* `hec_token`: Splunk HEC token
	* `hec_host`: Splunk HEC endpoint URL and port

	Example:
   ```	
	$ curl -H "Content-Type: application/json" "http://myproxy.azurewebsites.net/services/collector?hec_token=63656DF7-05C8-4253-A748-0A72750225D6&hec_host=mysplunk.westus.cloudapp.azure.com:8088" -d '{"foo": "bar"}'
   ```
