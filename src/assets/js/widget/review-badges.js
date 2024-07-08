var scriptTag_review_badge;
var review_badge_node;
var allScripts;
var review_badge_url;

// theme start
var backgroundClr;
var textClr;
// theme end

// review platform color start
var data;
// review platform color end

reviewPlatformList = [];

(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("review-badges")) {
			let splitUrl = aln.src.split("/");
			this.review_badge_url = splitUrl[0] + "//" + splitUrl[2] + "/";
			// var theme = splitUrl[6].split("&");
			// this.backgroundClr = theme[1].split("=")[1];
			// this.textClr = theme[2].split("=")[1];
		}
	});


	if (this.review_badge_url == undefined) {
		this.review_badge_url =
			"https://app.grabyourreviews.com/" +
			"assets/media/review-widget/" +
								arr[i].source +
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
		this.review_badge_url +
		"assets/js/widget/" + "review-badges.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	this.review_badge_node = document.createElement("div");
	this.review_badge_node.className = "rsw_mt-3-b rsw_container-b";
	



	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_REVIEW_BADGES"
		) {
			scriptTag_review_badge = aln;
			setTimeout(() => {
				scriptTag_review_badge.parentNode.insertBefore(
					this.review_badge_node,
					scriptTag_review_badge.nextSibling
				);
			}, 2000);
		}
	});

	setTimeout(() => {
		getReviewBadge();
	}, 2000);
})();

function getReviewBadge() {
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("review-badges")) {
			let split1 = aln.src.split("accesskey=");
			var apiData = callReviewBadgeApi(split1[1]);
			apiData.then((e) => {
				// if (e.success) {
				
				review_badge_div_row = document.createElement("div");
				review_badge_div_row.className = "rsw_row-b";
				review_badge_div_row.setAttribute("style", "padding:10px 0px");
				this.review_badge_node.appendChild(review_badge_div_row);
				let arr = [];
				e.data.filter((e) => {
					arr.push(e);
				});

				this.data = [
					{
						reviewPlatform: "Google",
						colorCode: "#3cba54",
					},
					{
						reviewPlatform: "Yelp",
						colorCode: "#da2730",
					},
					{
						reviewPlatform: "Facebook",
						colorCode: "#3c5a98",
					},
					{
						reviewPlatform: "Agoda",
						colorCode: "#8f6bd6",
					},
					{
						reviewPlatform: "Airbnb",
						colorCode: "#ff5a63",
					},
					{
						reviewPlatform: "AlternativeTo",
						colorCode: "#1174a8",
					},
					{
						reviewPlatform: "Angies List",
						colorCode: "#75ae44",
					},
					{
						reviewPlatform: "Avvo",
						colorCode: "#01457b",
					},
					{
						reviewPlatform: "BBB",
						colorCode: "#136896",
					},
					{
						reviewPlatform: "Booking",
						colorCode: "#203a76",
					},
					{
						reviewPlatform: "Capterra",
						colorCode: "#017ac3",
					},
					{
						reviewPlatform: "CarGurus",
						colorCode: "#ef3842",
					},
					{
						reviewPlatform: "Cars.com",
						colorCode: "#3f176f",
					},
					{
						reviewPlatform: "Citysearch",
						colorCode: "#208fc6",
					},
					{
						reviewPlatform: "Consumer Affairs",
						colorCode: "#186da3",
					},
					{
						reviewPlatform: "CreditKarma",
						colorCode: "#3cdea7",
					},
					{
						reviewPlatform: "Customer Lobby",
						colorCode: "#ff9e4a",
					},
					{
						reviewPlatform: "DealerRater",
						colorCode: "#525caa",
					},
					{
						reviewPlatform: "eBay",
						colorCode: "#0768d2",
					},
					{
						reviewPlatform: "Edmunds",
						colorCode: "#0c81e4",
					},
					{
						reviewPlatform: "Expedia",
						colorCode: "#fec50b",
					},
					{
						reviewPlatform: "G2Crowd",
						colorCode: "#456474",
					},
					{
						reviewPlatform: "Glassdoor",
						colorCode: "#81b024",
					},
					{
						reviewPlatform: "GreatSchools",
						colorCode: "#27abe2",
					},
					{
						reviewPlatform: "HealthGrades",
						colorCode: "#0302e9",
					},
					{
						reviewPlatform: "HomeAdvisor",
						colorCode: "#5e707a",
					},
					{
						reviewPlatform: "Homestars",
						colorCode: "#1eacee",
					},
					{
						reviewPlatform: "Hotels",
						colorCode: "#cb2d31",
					},
					{
						reviewPlatform: "Houzz",
						colorCode: "#4ebc16",
					},
					{
						reviewPlatform: "Indeed",
						colorCode: "#2265f3",
					},
					{
						reviewPlatform: "Insider Pages",
						colorCode: "#438eb5",
					},
					{
						reviewPlatform: "Jet",
						colorCode: "#8101ff",
					},
					{
						reviewPlatform: "Lawyers.com",
						colorCode: "#0175c9",
					},
					{
						reviewPlatform: "LendingTree",
						colorCode: "#7fca56",
					},
					{
						reviewPlatform: "Martindale",
						colorCode: "#000000",
					},
					{
						reviewPlatform: "NewEgg",
						colorCode: "#f9b12b",
					},
					{
						reviewPlatform: "Niche",
						colorCode: "#67ab59",
					},
					{
						reviewPlatform: "OpenRice",
						colorCode: "#ffcb05",
					},
					{
						reviewPlatform: "OpenTable",
						colorCode: "#dd3846",
					},
					{
						reviewPlatform: "Product Hunt",
						colorCode: "#da5532",
					},
					{
						reviewPlatform: "ProductReview",
						colorCode: "#7fb829",
					},
					{
						reviewPlatform: "RateMDs",
						colorCode: "#539ea2",
					},
					{
						reviewPlatform: "Siftery",
						colorCode: "#4372d6",
					},
					{
						reviewPlatform: "Sitejabber",
						colorCode: "#153e6a",
					},
					{
						reviewPlatform: "Software Advice",
						colorCode: "#f9b150",
					},
					{
						reviewPlatform: "The Knot",
						colorCode: "#5bb6eb",
					},
					{
						reviewPlatform: "Thumbtack",
						colorCode: "#2e3033",
					},
					{
						reviewPlatform: "TripAdvisor",
						colorCode: "#79b151",
					},
					{
						reviewPlatform: "Trulia",
						colorCode: "#22c064",
					},
					{
						reviewPlatform: "TrustedShops",
						colorCode: "#010101",
					},
					{
						reviewPlatform: "Trustpilot",
						colorCode: "#01b67b",
					},
					{
						reviewPlatform: "TrustRadius",
						colorCode: "#08378e",
					},
					{
						reviewPlatform: "Vitals",
						colorCode: "#3d1a52",
					},
					{
						reviewPlatform: "Walmart",
						colorCode: "#ffc222",
					},
					{
						reviewPlatform: "WeddingWire",
						colorCode: "#17b6bc",
					},
					{
						reviewPlatform: "Yell",
						colorCode: "#1e1e1c",
					},
					{
						reviewPlatform: "Yellow Pages",
						colorCode: "#222020",
					},
					{
						reviewPlatform: "Zillow",
						colorCode: "#0174e6",
					},
					{
						reviewPlatform: "ZocDoc",
						colorCode: "#13264a",
					},
					{
						reviewPlatform: "Zomato",
						colorCode: "#d2194a",
					},
					{
						reviewPlatform: "Playstore",
						colorCode: "#4bd0c6",
					},
				];

				let borderBottomColor;

				for (i = 0; i < arr.length; i++) {
					this.data.filter((e) => {
						if (e.reviewPlatform == arr[i].source) {
							borderBottomColor = e.colorCode;
						}
					});

					this.reviewPlatformList.filter((e) => {
						if (e == arr[i].source) {
							review_badge_div_col =
								document.createElement("div");
							review_badge_div_col.className = "rsw_col-4-b rsw_col-sm-12-b";
							review_badge_div_row.appendChild(
								review_badge_div_col
							);
							
							review_badge_div_card =
								document.createElement("div");
							review_badge_div_card.className = "rsw_card-b";
							// review_badge_div_card.setAttribute(
							// 	"style",
							// 	"border-bottom: 7px solid " +
							// 		borderBottomColor +
							// 		";"
							// );
							review_badge_div_col.appendChild(
								review_badge_div_card
							);

							review_badge_div_card_row =
								document.createElement("div");
							review_badge_div_card_row.className =
								"rsw_row-b rsw_p-5-b rsw_flex-center-b";
							var review_badge_bg =
								this.review_badge_url  +
								"assets/images/card-bg.svg";
								review_badge_div_card_row.setAttribute(
									"style",
									"background: url('"+ review_badge_bg  +"');"
							);
						


							review_badge_div_card.appendChild(
								review_badge_div_card_row
							);

						

							review_badge_div_card_col8 =
								document.createElement("div");
							review_badge_div_card_col8.className =
								"rsw_col-8-b rsw_flex-center-b";
							review_badge_div_card_row.appendChild(
								review_badge_div_card_col8
							);

							review_badge_div_card_col8_row =
								document.createElement("div");
							review_badge_div_card_col8_row.className =
								"rsw_row-b";
							review_badge_div_card_col8.appendChild(
								review_badge_div_card_col8_row
							);

							review_badge_div_card_col8_row_platformName =
								document.createElement("div");
							review_badge_div_card_col8_row_platformName.className =
								"rsw_col-12-b";
							review_badge_div_card_col8_row.appendChild(
								review_badge_div_card_col8_row_platformName
							);

							review_badge_div_card_col8_row_platformName_name =
								document.createElement("b");
							review_badge_div_card_col8_row_platformName_name.textContent =
								arr[i].source + " Rating";
							review_badge_div_card_col8_row_platformName.appendChild(
								review_badge_div_card_col8_row_platformName_name
							);

							review_badge_div_card_col8_row_rating =
								document.createElement("div");
							review_badge_div_card_col8_row_rating.className =
								"rsw_col-12-b rsw_rating-b";
							review_badge_div_card_col8_row.appendChild(
								review_badge_div_card_col8_row_rating
							);

							review_badge_div_card_col8_row_rating_h3 =
								document.createElement("h3");
							review_badge_div_card_col8_row_rating_h3.setAttribute(
								"style",
								"margin:0"
							);
							review_badge_div_card_col8_row_rating_h3.textContent =
								arr[i].rating;
							review_badge_div_card_col8_row_rating.appendChild(
								review_badge_div_card_col8_row_rating_h3
							);
							// review_badge_star_outer_span = document.createElement("span");
							// review_badge_star_outer_span.className = "stars-outer-bg";
							// review_badge_div_card_col8_row_rating.appendChild(review_badge_star_outer_span);
			
							// review_badge_star_inner_span = document.createElement("span");
							// review_badge_star_inner_span.className = "stars-inner-bg";
							// review_badge_star_inner_span.setAttribute("style", "width:" + (arr[i].rating * 100) / 5 + "%");
							// review_badge_star_outer_span.appendChild(review_badge_star_inner_span);
			
							review_badge_star_inner_star_div = document.createElement("div");
							review_badge_star_inner_star_div.className = "star-rating";
							review_badge_star_inner_star_div.setAttribute("data-rating",  (arr[i].rating * 100) / 5 );
							review_badge_div_card_col8_row_rating.appendChild(review_badge_star_inner_star_div);


 const starContainer = document.querySelector('.star-rating');
  const rating = parseFloat(starContainer.getAttribute('data-rating')); // Get the rating percentage
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
    starContainer.appendChild(star);
  }

  


							review_badge_div_card_col8_row_allReviewLink =
								document.createElement("div");
							review_badge_div_card_col8_row_allReviewLink.className =
								"rsw_col-12-b";
							review_badge_div_card_col8_row.appendChild(
								review_badge_div_card_col8_row_allReviewLink
							);

							// review_badge_div_card_col8_row_allReviewLink_link =
							// 	document.createElement("a");
							// review_badge_div_card_col8_row_allReviewLink_link.href =
							// 	arr[i].sourceURL;
							// review_badge_div_card_col8_row_allReviewLink_link.target =
							// 	"_blank";
							// review_badge_div_card_col8_row_allReviewLink_link.textContent =
							// 	"See " + arr[i].reviews + " reviews";
							// review_badge_div_card_col8_row_allReviewLink_link.className =
							// 	"rsw_link-b";
							// review_badge_div_card_col8_row_allReviewLink.appendChild(
							// 	review_badge_div_card_col8_row_allReviewLink_link
							// );
							review_badge_div_card_col4 =
							document.createElement("div");
						review_badge_div_card_col4.className =
							"rsw_col-4-b rsw_review-platform-logo-parent-b";
						review_badge_div_card_row.appendChild(
							review_badge_div_card_col4
						);

						reviw_badge_div_card_col4_img =
							document.createElement("img");
						reviw_badge_div_card_col4_img.src =
						this.review_badge_url+ "assets/social-logo/" +
							arr[i].source +
							".png";
						// reviw_badge_div_card_col4_img.setAttribute(
						// 	"style",
						// 	"width:50%;padding:5%"
						// );
						review_badge_div_card_col4.appendChild(
							reviw_badge_div_card_col4_img
						);
						}
					});
				}
				// }
			});
		}
	});
}

async function callReviewBadgeApi(e) {
	let tempVal = e.split("&reviewplatform=");
	this.reviewPlatformList = tempVal[1].split(",");
	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetBadgeDetails?Key=" +
			e.split("&")[0]
	);
	const myJson = await response.json();
	return myJson;
}

function redirectToBrandingBadge() {
	window.open("https://grabyourreviews.com/?utm_source=widget", "_blank");
}


