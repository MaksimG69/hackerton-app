function includeHTML() {
	let html = document.createElement("div");
	html.innerHTML = '<div class="shipping-calculator" style="display: flex; background-color:#a30000;"><div class="shipping-logo"><img style="max-width: 25px; margin-right: 10px;"src="https://cdn.shopify.com/s/files/1/0516/1566/2253/files/Truck.png?v=1605966401" alt="Shipping"></div><div class="shipping-conditions">{%- if product.price < 3000%}<p>3,90€ Shipping to Germany</p>{% else %}<p>Free Shipping to Germany</p>{% endif %}</div></div>';
	//html.innerHTML = "<p>hello World</p>";
	let formElemt = document.querySelector('[action="/cart/add"]');

	let parentFormElementDiv = formElemt.parentNode;
	console.log(parentFormElementDiv);
	parentFormElementDiv.insertBefore(html, formElemt);
}

function getParams(scriptName) {
	var scripts = document.getElementsByTagName("script");

	for (var i = 0; i < scripts.length; i++) {
			if (scripts[i].src.indexOf("/" + scriptName) > -1) {
					var pa = scripts[i].src.split("?").pop().split("&");

					// Split each key=value into array, the construct js object
					var p = {};
					for (var j = 0; j < pa.length; j++) {
							var kv = pa[j].split("=");
							p[kv[0]] = kv[1];
					}
					return p;
			}
	}

	return {};
}

function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					callback(xmlHttp.responseText);
			} else if (xmlHttp.readyState == 4) {
					// httpGetAsync(theUrl, callback);
			}
	}
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
}


function getConfig() {
	var SCRIPT_NAME = 'shipping-loader.js';

	httpGetAsync("https://605d37bddf5d.ngrok.io/public-config?shop=" + getParams(SCRIPT_NAME).shop, function (config) {
			// applyConfig(config);
			// document.getElementsByClassName("wa-chat")[0].style.display = "block";
			console.log(JSON.parse(config));

			// TODO apply config
	})
}

includeHTML();
getConfig();
