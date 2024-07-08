var scriptTag_autoSlider;
var key;
var autoSlider_node;
var allScripts;
var autoSlider_url;
var autoPlay;
var backgroundClrAS = "#000";
var textClrAS = "#fff";
var swiper;

(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("auto-slider")) {
			let splitUrl = aln.src.split("/");
			let splitUrlByAnd = splitUrl[6].split("&");
			let splitAutoplay = splitUrlByAnd[6].split("=");
			this.autoPlay = splitAutoplay[1];
			this.autoSlider_url = splitUrl[0] + "//" + splitUrl[2] + "/";
		}
	});

	if (this.autoSlider_url == undefined) {
		this.autoSlider_url =
			"https://app.grabyourreviews.com/" +
			"assets/media/social-logo/" +
			e.reviewSource +
			".png";
	}

	if (document.getElementsByTagName("meta")[1]?.name != "viewport") {
		var meta = document.createElement("meta");
		meta.name = "viewport";
		meta.content = "width=device-width, initial-scale=1.0";
		(
			document.getElementsByTagName("head")[0] || document.documentElement
		).appendChild(meta);
	}

	var link_tag = document.createElement("link");
	link_tag.setAttribute("type", "text/css");
	link_tag.setAttribute("rel", "stylesheet");
	link_tag.setAttribute(
		"href",
		this.autoSlider_url + "assets/js/widget/auto-slider.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	this.autoSlider_node = document.createElement("div");
	this.autoSlider_node.className = "gyr_container-as";

	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_AUTO_SLIDER"
		) {
			scriptTag_autoSlider = aln;

			setTimeout(() => {
				scriptTag_autoSlider.parentNode.insertBefore(
					this.autoSlider_node,
					scriptTag_autoSlider.nextSibling
				);
			}, 2000);
		}
	});

	setTimeout(() => {
		getAutoSliderReview();
	}, 2000);
})();

function getAutoSliderReview() {
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("auto-slider")) {
			let splitUrl = aln.src.split("/");
			this.floatingReview_url = splitUrl[0] + "//" + splitUrl[2] + "/";
			let split1 = aln.src.split("accessKey=");
			var apiData = callAutoSliderApi(split1[1]);
			apiData.then((e) => {
				bindAutoSliderData(e);
			});
		}
	});
}

function bindAutoSliderData(data) {
	autoSliderData = data.rvwDetails.data;
	autoSlider_node = this.autoSlider_node;

	autoSlider_node2 = document.createElement("div");
	autoSlider_node2.className = "items-as";
	autoSlider_node2.id = "itemsReview";
	autoSlider_node.appendChild(autoSlider_node2);

	autoSliderData.forEach((e) => {
		autoSlider_node3 = document.createElement("div");
		autoSlider_node3.className = "entry-as";
		autoSlider_node3.setAttribute(
			"style",
			"background:" +
				this.backgroundClrAS +
				"!important;color:" +
				this.textClrAS +
				";"
		);
		autoSlider_node2.appendChild(autoSlider_node3);

		autoSlider_node4 = document.createElement("p");
		autoSlider_node4.className = "name-as";
		autoSlider_node4.textContent = e.reviewBy;
		autoSlider_node3.appendChild(autoSlider_node4);

		autoSlider_node5 = document.createElement("img");
		autoSlider_node5.src = e.profileImgUrl;
		autoSlider_node5.setAttribute("onerror", "myAutoSliderFunction(this)");
		autoSlider_node5.className = "profile-img-as";
		autoSlider_node3.appendChild(autoSlider_node5);

		// autoSlider_node6 = document.createElement("img");
		// autoSlider_node6.src =
		// 	this.autoSlider_url +
		// 	"assets/media/Star-Images/Star-" +
		// 	e.rating +
		// 	".png";
		// autoSlider_node6.className = "review-star-as";
		// autoSlider_node3.appendChild(autoSlider_node6);

		autoSlider_star_outer_span = document.createElement("span");
		autoSlider_star_outer_span.className = "stars-outer-as";
		autoSlider_node3.appendChild(autoSlider_star_outer_span);

		autoSlider_star_inner_span = document.createElement("span");
		autoSlider_star_inner_span.className = "stars-inner-as";
		autoSlider_star_inner_span.setAttribute("style", "width:" + (e.rating * 100) / 5 + "%");
		autoSlider_star_outer_span.appendChild(autoSlider_star_inner_span);

		autoSlider_node7 = document.createElement("div");
		autoSlider_node7.className = "verified-as";
		autoSlider_node3.appendChild(autoSlider_node7);

		autoSlider_node8 = document.createElement("span");
		autoSlider_node8.textContent = "Verified on";
		autoSlider_node7.appendChild(autoSlider_node8);

		autoSlider_node9 = document.createElement("img");
		autoSlider_node9.className = "review-platform-logo-as";
		autoSlider_node9.src =
			this.autoSlider_url +
			"assets/media/social-logo/" +
			e.reviewSource +
			".png";
		autoSlider_node7.appendChild(autoSlider_node9);
	});
}

async function callAutoSliderApi(e) {
	let urlValue = e.split("&backgroundcolor");
	clr = urlValue[1].split("#");
	finalBgClr = clr[1].split("&");

	this.backgroundClrAS = "#" + finalBgClr[0];
	this.textClrAS = "#" + clr[2].split("&")[0];
	let key = urlValue[0];
	let restData = urlValue[1].split("totalreviews=")[1];
	let param = restData.split("&");
	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetReviewDetail?Key=" +
			key +
			"&pageNumber=1&pageSize=" +
			param[0] +
			"&showEmptyReview=" +
			param[1].split("excludereviewnotext=")[1] +
			"&minStars=" +
			param[2].split("ministars=")[1]
	);
	const myJson = await response.json();
	return myJson;
}

function myAutoSliderFunction(e) {
	e.setAttribute(
		"src",
		this.autoSlider_url + "assets/media/images/no-review-profile.png"
	);
}
