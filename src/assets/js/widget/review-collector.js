var scriptTag_micro_review_collector;
var review_collector_node;
var allScripts;
var review_collector_url;

// theme start
var backgroundClrRC;
var textClrRC;
// theme end

(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("review-collector")) {
			let splitUrl = aln.src.split("/");
			this.review_collector_url = splitUrl[0] + "//" + splitUrl[2] + "/";
			// this.review_collector_url =  "C:/Users/jaydu/Downloads/widget/widget/";

			var theme = splitUrl[6].split("&");
			this.backgroundClr = theme[1].split("=");
			this.textClr = theme[2].split("=");
		}
	});

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
		this.review_collector_url +
			"assets/js/widget/" +
			"review-collector.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	this.review_collector_node = document.createElement("div");
	this.review_collector_node.id = "review-count-rc";

	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_REVIEW_COLLECTOR"
		) {
			scriptTag_micro_review_collector = aln;
			setTimeout(() => {
				scriptTag_micro_review_collector.parentNode.insertBefore(
					this.review_collector_node,
					scriptTag_micro_review_collector.nextSibling
				);
			}, 2000);
		}
	});

	setTimeout(() => {
		getReviewCollectorData();
	}, 2000);
})();

function getReviewCollectorData() {
	var reviewData;
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("review-collector")) {
			let split1 = aln.src.split("accesskey=");
			var apiData = callReviewCollectorApi(split1[1]);
			apiData.then((e) => {

				rc_poweredByMain_div = document.createElement("div");
				rc_poweredByMain_div.className = "rew_collector-review-main";
				// var rc_poweredByMain_divBG =
				// this.review_collector_url  +
				// "assets/media/images/review-collecterBG2.png";
				// rc_poweredByMain_div.setAttribute(
				// 	"style",
				// 	"background: url('"+ rc_poweredByMain_divBG  +"');"
				// );
				this.review_collector_node.appendChild(rc_poweredByMain_div);

				rc_poweredBycontent_div = document.createElement("div");
				rc_poweredBycontent_div.className = "rew_collector-review-content";
				rc_poweredByMain_div.appendChild(rc_poweredBycontent_div);

				// rc_poweredByImg_div = document.createElement("div");
				// rc_poweredByImg_div.className = "rew_collector-review-image";
				// rc_poweredByMain_div.appendChild(rc_poweredByImg_div);
				// rc_poweredBy_img = document.createElement("img");
				// rc_poweredBy_img.src =
				// this.review_collector_url  +
				// "assets/media/images/review-collector.png";
				// rc_poweredByImg_div.appendChild(rc_poweredBy_img);

				review_collector_p = document.createElement("p");
				review_collector_p.setAttribute(
					"style",
					"letter-spacing: 1px;color:" + this.textClr + "!important;"
				);
				this.rc_poweredBycontent_div.appendChild(review_collector_p);

				review_collector_anchor = document.createElement("a");
				review_collector_anchor.className = "rsw-btn-reviewus-rc";
				review_collector_anchor.href = e.data.sourceURL;
				review_collector_anchor.target = "_blank";
				this.rc_poweredBycontent_div.appendChild(review_collector_anchor);
				review_collector_span = document.createElement("span");
				review_collector_span.textContent = "leave a review";
				review_collector_span.setAttribute(
					"style",
					"color:" + this.textClrRC + "!important;"
				);
				review_collector_anchor.appendChild(review_collector_span);

				review_collector_star_outer_span =
					document.createElement("span");
				review_collector_star_outer_span.className = "stars-outer-rc";
				review_collector_anchor.appendChild(
					review_collector_star_outer_span
				);

				review_collector_star_inner_span =
					document.createElement("span");
				review_collector_star_inner_span.className = "stars-inner-rc";
				review_collector_star_outer_span.appendChild(
					review_collector_star_inner_span
				);

				review_collector_b_performance = document.createElement("b");
				review_collector_b_performance.textContent =
					e.data.avgRating > 4
						? "Excellent "
						: e.data.avgRating > 3
						? "Great "
						: e.data.avgRating > 2
						? "Good "
						: e.data.avgRating > 1
						? "Ok "
						: "Poor ";
				review_collector_p.appendChild(review_collector_b_performance);

				review_collector_simpletext = document.createElement("span");
				review_collector_simpletext.textContent =
					e.data.avgRating + " out of 5 based on ";
				review_collector_p.appendChild(review_collector_simpletext);

				review_collector_anchor_reviews = document.createElement("a");
				review_collector_anchor_reviews.setAttribute(
					"style",
					"font-weight:600"
				);
				review_collector_anchor_reviews.textContent =
					e.data.totalReviews + " reviews ";
				review_collector_anchor_reviews.className = "rew_collector-anchor_reviews";
				review_collector_anchor_reviews.setAttribute(
					"style",
					"color:" + this.textClrRC + "!important;"
				);
				review_collector_p.appendChild(review_collector_anchor_reviews);
					
					if (e.data.isBranding) {
						rc_poweredByParent_div = document.createElement("div");
						rc_poweredByParent_div.className = "rew_collector-powerBy";
						this.review_collector_node.appendChild(rc_poweredByParent_div);

						rc_poweredBy_p = document.createElement("p");
						rc_poweredBy_p.textContent = "Powered By";
						rc_poweredBy_p.setAttribute("onclick","redirectToBrandingRC()");
						rc_poweredBy_p.setAttribute(
							"style",
			                 "cursor:pointer;font-size: 13px !important;"
						);
						rc_poweredByParent_div.appendChild(rc_poweredBy_p);
	
						rc_poweredBy_img = document.createElement("img");
						rc_poweredBy_img.src =
						this.review_collector_url  +
						"assets/images/Logo_Back_Transparent.svg";
						rc_poweredBy_img.setAttribute(
							"style",
							"margin-left: 0.5%;margin-top: 2%;width: 100px !important;"
						);
						rc_poweredBy_p.appendChild(rc_poweredBy_img);
					}
							
			});
		}
	});
}

async function callReviewCollectorApi(e) {
	this.key = e.split("&");
	let data = {
		key: this.key[0],
	};
	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetReviewSummary?key=" +
			this.key[0]
	);
	const myJson = await response.json();
	let urlValue = e.split("&backgroundcolor");
	clr = urlValue[1].split("#");
	finalBgClr = clr[1].split("&");

	this.backgroundClrRC = "#" + finalBgClr[0];
	this.textClrRC = "#" + clr[2];
	this.review_collector_node.setAttribute(
		"style",
		"background:" + this.backgroundClrRC + ";color:" + this.textClrRC + ";"
	);
	return myJson;
}

function redirectToBrandingRC() {
	window.open("https://grabyourreviews.com/?utm_source=widget", "_blank");
}

