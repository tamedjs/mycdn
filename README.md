# MyCDN

 A local development server to work on static files, REST endpoints, reverse proxy, and caching proxied responses.


### Common commands for Unix like machines

```
// Port forward with socat
sudo socat TCP4-LISTEN:443,fork TCP4:127.0.0.1:8443

// Monitor a port's traffic
sudo tcpdump -i any port 8443

// Check an endpoint
curl -k https://localhost:8443 && echo ""
```
