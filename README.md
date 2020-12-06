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

## Ecosystem

* Layout - Setups organization or relationship of Ui components on a page
* Ui Framework (aka Design System)
  * Bluma
  * Material
  * UiKit
  * **NOTE:** The End User typically will not interact with the choice for Framework. This is because the choice for this will usually be done at a development level.
* Theme - A styling variation of a Ui Framework's Look

### Ui Kits

* Ui - This is the generic Ui that comes with MyCDN that uses the UiKit library
  * NOTE: For now will be in Angular, but could have many framework implementations in the future.
  * Allows for changing of themes.
    * Under the hood the Ui system is really just pulling in a compiled variation theme built in Angular (ex: EDS, CDS, Bluma, Bootstrap, etc)
  * Variations:
    * CDS Legacy - The Crexendo Legacy Ui look.
    * CDS SmartAdmin Material (Light) - The Crexendo theme based on [Smartadmin's Material Design](https://www.gotbootstrap.com/themes/smartadmin/1.9.6.1/flavor/ajax/index.html#ajax/general-elements.html).
    * CDS SmartAdmin WebApp- The Crexendo theme based on [Smartadmin's New WebApp Design](https://www.gotbootstrap.com/themes/smartadmin/4.5.1/intel_analytics_dashboard.html).
    * CDS Smart Home - The Crexendo theme based on Invision's [Smart Home Design](https://www.invisionapp.com/inside-design/design-resources/smart-home-ui-kit/).
    * EDS - A Ui libray using the Experian Design system

### Comm System

Works by transporting messages throughout the ui system. Messages be direct to a target or listened for.

* Data Resoltion should follow these steps:
  * Send comm message
  * Make request to storage
  * Format response for usage with target
  * Update ui data
  * Render the results
