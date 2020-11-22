function includeHTML() {
	let html = document.createElement("div");
	html.innerHTML = '<div class="shipping-calculator" style="display: flex; background-color:#a30000;"><div class="shipping-logo"><img style="max-width: 25px; margin-right: 10px;"src="https://cdn.shopify.com/s/files/1/0516/1566/2253/files/Truck.png?v=1605966401" alt="Shipping"></div><div class="shipping-conditions">{%- if product.price < 3000%}<p>3,90€ Shipping to Germany</p>{% else %}<p>Free Shipping to Germany</p>{% endif %}</div></div>';
	//html.innerHTML = "<p>hello World</p>";
	let formElemt = document.querySelector('[action="/cart/add"]');

	let parentFormElementDiv = formElemt.parentNode;
	console.log(parentFormElementDiv);
	parentFormElementDiv.insertBefore(html, formElemt);
}

includeHTML();
