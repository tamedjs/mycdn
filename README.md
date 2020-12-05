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

### Intercept Browser AJAX Calls
* Electron
  * [Electron Webview Intercept](https://stackoverflow.com/questions/50974767/electron-manipulate-intercept-webview-requests-and-responses)
* Tamper Monkey
  * [Include Scripts](https://stackoverflow.com/questions/15475404/include-all-pages-in-tampermonkeyuserscript)
  * [VanillaJs OnLoad Event](https://www.javascripttutorial.net/javascript-dom/javascript-onload/)
  * [Read Script from Local File](https://stackoverflow.com/questions/49509874/how-to-update-tampermonkey-script-to-a-local-file-programmatically)
  * [Read from Local File](https://stackoverflow.com/questions/53589149/is-it-possible-to-load-a-userscript-from-the-local-filesystem)
