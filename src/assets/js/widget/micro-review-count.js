var scriptTag_micro_review;
var micro_review_node;
var allScripts;
var micro_review_url;

// theme start
var backgroundClrMRC = "#000";
var textClrMRC = "#fff";
// theme end

(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("micro-review-count")) {
			let splitUrl = aln.src.split("/");
			this.micro_review_url = splitUrl[0] + "//" + splitUrl[2] + "/";
		}
	});

	if (document.getElementsByTagName("meta")[1] ?.name != "viewport") {
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
		this.micro_review_url + "assets/js/widget/micro-review-count.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);
	this.micro_review_node = document.createElement("div");
	this.micro_review_node.id = "review-count";

	this.micro_review_node.setAttribute("style", "text-align:center;");
	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_MICRO_REVIEW"
		) {
			scriptTag_micro_review = aln;
			setTimeout(() => {
				scriptTag_micro_review.parentNode.insertBefore(
					this.micro_review_node,
					scriptTag_micro_review.nextSibling
				);
			}, 2000);
		}
	});

	setTimeout(() => {
		getMicroReview();
	}, 2000);
})();

function getMicroReview() {
	var microReviewData;
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("micro-review-count")) {
			let split1 = aln.src.split("accesskey=");
			var apiData = callMicroReviewApi(split1[1]);
			apiData.then((e) => {
				// if (e.success) {





				micro_review_marquee = document.createElement("div");
				micro_review_marquee.className = "rsw-parent-main";

				micro_review_marquee.setAttribute(
					"style",
					"background:" +
					this.backgroundClrMRC +
					";color:" +
					this.textClrMRC +
					";"
				);
				this.micro_review_node.appendChild(micro_review_marquee);

				micro_review_marquee_content_div = document.createElement("div");
				micro_review_marquee_content_div.className = "rew_micro-review-content";
				micro_review_marquee.appendChild(micro_review_marquee_content_div);

				// micro_review_marquee_img_div = document.createElement("div");
				// micro_review_marquee_img_div.className = "rew_micro-review-image";
				// micro_review_marquee.appendChild(micro_review_marquee_img_div);

				// micro_review_marquee_img = document.createElement("img");
				// micro_review_marquee_img.src =
				// this.micro_review_url  +
				// "assets/media/images/review-collector.png";
				// micro_review_marquee_img_div.appendChild(micro_review_marquee_img);

				micro_review_p = document.createElement("p");
				micro_review_p.className = "rsw-parent-mrc";
				micro_review_p.textContent = "Our customers say";
				micro_review_marquee_content_div.appendChild(micro_review_p);

				micro_review_p2 = document.createElement("p");
				micro_review_p2.className = "rsw-parent-mrc2";
				micro_review_marquee_content_div.appendChild(micro_review_p2);

				micro_review_span = document.createElement("span");
				micro_review_span.className = "rsw-span-mrc";
				micro_review_span.textContent =
					e.data.avgRating > 5
						? "Excellent "
						: e.data.avgRating > 4
							? "Great "
							: e.data.avgRating > 3
								? "Good "
								: e.data.avgRating > 2
									? "Ok "
									: "Poor ";
				micro_review_p.appendChild(micro_review_span);
				
				// micro_review_star_outer_span = document.createElement("span");
				// micro_review_star_outer_span.className = "stars-outer-mrc";
				// micro_review_p2.appendChild(micro_review_star_outer_span);

				// micro_review_star_inner_span = document.createElement("span");
				// micro_review_star_inner_span.className = "stars-inner-mrc";
				// micro_review_star_inner_span.setAttribute("style","width:"+(e.avgRating * 100) / 5 + "%");
				// micro_review_star_outer_span.appendChild(micro_review_star_inner_span);

				micro_review_star_inner_star_div = document.createElement("div");
				micro_review_star_inner_star_div.className = "micro-review-star-rating";
				micro_review_star_inner_star_div.setAttribute("data-rating",  (e.data.avgRating * 100) / 5 );
				micro_review_p2.appendChild(micro_review_star_inner_star_div);
				const micro_review_star_container = document.querySelector('.micro-review-star-rating');
				const rating = parseFloat(micro_review_star_container.getAttribute('data-rating')); // Get the rating percentage
				const maxStars = 5; // Total number of stars
				const percentagePerStar = 100 / maxStars; // Percentage per single star

				for (let i = 0; i < maxStars; i++) {
					const star = document.createElement('div');
					star.classList.add('star');
					const starFill = document.createElement('div');
					starFill.classList.add('star-fill');

					// Calculate fill percentage for each star
					let fillPercentage = Math.max(0, Math.min(100, (rating - i * percentagePerStar) * maxStars));
					starFill.style.width = `${fillPercentage}%`;


					starFill.setAttribute("style", "width:" + fillPercentage + "%");
					// review_badge_star_outer_span.appendChild(review_badge_star_inner_span);

					star.appendChild(starFill);
					micro_review_star_container.appendChild(star);
				}

				micro_review_span_2 = document.createElement("span");
				micro_review_span_2.className = "rsw-rating-mrc";
				micro_review_span_2.textContent =
					e.data.avgRating + " out of 5 based on";
				micro_review_p2.appendChild(micro_review_span_2);

				micro_review_link = document.createElement("a");
				micro_review_link.setAttribute(
					"style",
					"color:" + this.textClrMRC + "!important;"
				);
				micro_review_link.className = "rsw-rating-mrc";
				micro_review_link.textContent = e.data.totalReviews + " reviews";
				micro_review_p2.appendChild(micro_review_link);			
				
				if (e.data.isBranding) {
					mrc_poweredByParent_div = document.createElement("div");
					mrc_poweredByParent_div.className = "rew_microcount-powerBy";
					this.micro_review_node.appendChild(mrc_poweredByParent_div);

					mrc_poweredBy_p = document.createElement("p");
					mrc_poweredBy_p.setAttribute("onclick","redirectToBrandingMRC()")
					mrc_poweredBy_p.textContent = "Powered By";
					mrc_poweredBy_p.setAttribute(
						"style",
						"cursor:pointer;font-size: 13px !important;"
					);
					
					mrc_poweredByParent_div.appendChild(mrc_poweredBy_p);

					mrc_poweredBy_img = document.createElement("img");
					mrc_poweredBy_img.src =
					this.micro_review_url +
					"assets/images/Logo_Back_Transparent.svg";
					mrc_poweredBy_img.setAttribute(
						"style",
						"margin-left: 0.5%;margin-top: 2%;width: 100px !important;"
					);
					mrc_poweredBy_p.appendChild(mrc_poweredBy_img);
				}
		// }
			});
		}
	});
}

async function callMicroReviewApi(e) {
	let urlValue = e.split("&backgroundcolor");
	this.key = e.split("&");
	let data = {
		key: this.key[0],
	};
	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetReviewSummary?Key=" + this.key[0]

	);
	clr = urlValue[1].split("#");
	finalBgClr = clr[1].split("&");

	this.backgroundClrMRC = "#" + finalBgClr[0];
	this.textClrMRC = "#" + clr[2];
	const myJson = await response.json();
	return myJson;
}

function redirectToBrandingMRC() {
	window.open("https://grabyourreviews.com/?utm_source=widget", "_blank");
}
