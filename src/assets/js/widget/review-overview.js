var scriptTag_review_overview;
var review_overview_node;
var allScripts;
var review_overview_url;

// theme start
var backgroundClrRO;
var textClrRO;
// theme end

(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("review-overview")) {
			let splitUrl = aln.src.split("/");
			this.review_overview_url = splitUrl[0] + "//" + splitUrl[2] + "/";
			var theme = splitUrl[6].split("&");
			this.backgroundClr = theme[1].split("=");
			this.textClr = theme[2].split("=");
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
		this.review_overview_url + "assets/js/widget/review-overview.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	this.review_overview_node = document.createElement("center");

	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_REVIEW_OVERVIEW"
		) {
			scriptTag_review_overview = aln;
			setTimeout(() => {
				scriptTag_review_overview.parentNode.insertBefore(
					this.review_overview_node,
					scriptTag_review_overview.nextSibling
				);
			}, 2000);
		}
	});

	setTimeout(() => {
		getReviewOverview();
	}, 2000);
})();

function getReviewOverview() {
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("review-overview")) {
			let split1 = aln.src.split("accesskey=");
			var apiData = callReviewOverviewApi(split1[1]);
			apiData.then((e) => {

				//if (e.success) {

				review_overview_card = document.createElement("div");
				review_overview_card.className = "rsw_card-ro rsw-m-3-ro";
				review_overview_card.setAttribute(
					"style",
					"background:" +
					this.backgroundClrRO +
					"!important;color:" +
					this.textClrRO +
					"!important;"
				);
				this.review_overview_node.appendChild(review_overview_card);

				review_overview_heading_div = document.createElement("div");
				review_overview_heading_div.textContent = "Rating Overview";
				review_overview_heading_div.setAttribute("style", "color:#3F3F46");
				review_overview_heading_div.id = "ratingOverview";
				// review_overview_heading_div.setAttribute(
				// 	"style",
				// 	"font-size: 24px;font-weight: 700;margin: 1% 0%;"
				// );
				// review_overview_card.appendChild(
				// 	review_overview_heading_div
				// );
				review_overview_allrating_div =
					document.createElement("div");
				// review_overview_allrating_div.setAttribute(
				// 	"style",
				// 	"margin: 2%;"
				// );
				review_overview_card.appendChild(
					review_overview_allrating_div
				);

				review_overview_allrating_row_div =
					document.createElement("div");
				review_overview_allrating_row_div.className =
					"rsw-row-ro rsw-p-3-ro";
				review_overview_allrating_div.appendChild(
					review_overview_allrating_row_div
				);

				review_overview_allrating_col2_div =
					document.createElement("div");
				review_overview_allrating_col2_div.className =
					"rsw-col-4-ro rsw-rating-ro";
				
				review_overview_allrating_row_div.appendChild(
					review_overview_allrating_col2_div
				);
				review_overview_allrating_col2_div.appendChild(
					review_overview_heading_div
				);

				review_overview_rating_div = document.createElement("div");
				review_overview_rating_div.className =
					"rsw-col-4-rating";
				review_overview_allrating_col2_div.appendChild(
					review_overview_rating_div
				);

				review_overview_rate_b = document.createElement("b");
				// review_overview_rate_b.setAttribute(
				// 	"style",
				// 	"font-size:45px"
				// );
				review_overview_rate_b.textContent = e.data.avgRating;
				review_overview_rating_div.appendChild(
					review_overview_rate_b
				);

				// review_overview_rate_span = document.createElement("span");
				// review_overview_rate_span.textContent = " / 58";
				// review_overview_rating_div.appendChild(
				// 	review_overview_rate_span
				// );

				review_overview_ratingstar_div =
					document.createElement("div");
				review_overview_ratingstar_div.setAttribute("style", " display : block;")
				review_overview_rating_div.appendChild(
					review_overview_ratingstar_div
				);

				// micro_review_star_outer_span = document.createElement("span");
				// micro_review_star_outer_span.className = "stars-outer-ro";
				// review_overview_ratingstar_div.appendChild(micro_review_star_outer_span);

				// micro_review_star_inner_span = document.createElement("span");
				// micro_review_star_inner_span.className = "stars-inner-ro";
				// micro_review_star_inner_span.setAttribute("style", "width:" + (e.avgRating * 100) / 5 + "%");
				// micro_review_star_outer_span.appendChild(micro_review_star_inner_span);

				// add rating stars
				micro_review_star_summary_star_inner_star_div = document.createElement("div");
				micro_review_star_summary_star_inner_star_div.className = "carousel-star-rating";
				micro_review_star_summary_star_inner_star_div.setAttribute("data-rating",  (e.data.avgRating * 100) / 5 );
				review_overview_ratingstar_div.appendChild(micro_review_star_summary_star_inner_star_div);
				const starContainer = document.querySelector('.carousel-star-rating');
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

				// review_overview_review_anchor_a =
				// 	document.createElement("a");
				// review_overview_review_anchor_a.textContent = e.totalReviews + " " + "Reviews";
				// review_overview_review_anchor_a.setAttribute(
				// 	"style",
				// 	" display:block; font-weight:600;letter-spacing: 1px;color:" +
				// 	this.textClrRO +
				// 	"!important;"
				// );
				// review_overview_ratingstar_div.appendChild(
				// 	review_overview_review_anchor_a
				// );


				//div-8
				review_overview_allrating_div_col8 =
					document.createElement("div");
				review_overview_allrating_div_col8.className =
					"rsw-col-8-ro rsw-border-left-ro rsw-width-ro";
				review_overview_allrating_row_div.appendChild(
					review_overview_allrating_div_col8
				);
				//end

				review_overview_overall_heading_div = document.createElement("div");
				review_overview_overall_heading_div.textContent = "Over All Ratings";
				review_overview_overall_heading_div.id = "overAllRatings";
				review_overview_overall_heading_div.setAttribute("style", "color:#18181B");
				review_overview_allrating_div_col8.appendChild(
					review_overview_overall_heading_div
				);

				
				review_overview_allrating_div_col8_2 =  
					document.createElement("div");
				review_overview_allrating_div_col8_2.className =
					"rsw-right-container-rating-bar";	
				review_overview_allrating_div_col8.appendChild(
					review_overview_allrating_div_col8_2
				);
				review_overview_allrating_div_co20 =  
					document.createElement("div");
					review_overview_allrating_div_co20.className =
						"rsw-right-container-view-all-review";	
					review_overview_allrating_div_col8.appendChild(
						review_overview_allrating_div_co20
				);


				review_overview_review_anchor_a =
					document.createElement("a");
				review_overview_review_anchor_a.className =
				"rsw-right-container-total-review";	
				review_overview_review_anchor_a.textContent = "Total Review :" + e.data.totalReviews;
				review_overview_review_anchor_a.setAttribute(
					"style",
					" display:block; font-weight:600;letter-spacing: 1px;color:" +
					this.textClrRO +
					"!important;"
				);
				review_overview_allrating_div_co20.appendChild(
					review_overview_review_anchor_a
				);

				review_overview_review_anchor_a2 =
					document.createElement("a");
				review_overview_review_anchor_a2.className =
				"rsw-right-container-view-all";	
				review_overview_review_anchor_a2.textContent = "View All Review";
				review_overview_review_anchor_a2.setAttribute(
					"style",
					" display:block; font-weight:600;letter-spacing: 1px;color:#196CFA; cursor:pointer;" +
					this.textClrRO +
					"!important;"
				);
				review_overview_review_anchor_a2.setAttribute(
					"href", "#"
				);
				review_overview_allrating_div_co20.appendChild(
					review_overview_review_anchor_a2
				);
				
				const descArr = e.data.rating.sort((a, b) => {
					return b.rating - a.rating;
				})
				for (let i = 0; i < descArr.length; i++) {
					let cal;
					cal = (descArr[i].count * 100) / e.data.totalReviews;
					descArr[i].width = cal;

					review_overview_allrating_row_div =
						document.createElement("div");
					review_overview_allrating_row_div.className =
						"rsw-row-ro rsw-text-center-ro rsw-p-3-ro";
					review_overview_allrating_div_col8_2.appendChild(
						review_overview_allrating_row_div
					);

					review_overview_allrating_col2_div =
						document.createElement("div");
					review_overview_allrating_col2_div.className =
						"rsw-col-2-ro";
					//review_overview_allrating_col2_div.setAttribute('style','display: inline-flex;align-items: center;justify-content: center;');
					review_overview_allrating_row_div.appendChild(
						review_overview_allrating_col2_div
					);

					review_overview_allrating_col8_div =
						document.createElement("div");
					review_overview_allrating_col8_div.className =
						"rsw-col-8-ro rating-width";
					review_overview_allrating_row_div.appendChild(
						review_overview_allrating_col8_div
					);

					review_overview_allrating_col2s_div =
						document.createElement("div");
					review_overview_allrating_col2s_div.className =
						"rsw-col-2-ro";
					review_overview_allrating_row_div.appendChild(
						review_overview_allrating_col2s_div
					);

					review_overview_allrating_col2_span =
						document.createElement("span");
						review_overview_allrating_col2_span.className =
						"rsw-star";
					review_overview_allrating_col2_span.textContent =
						descArr[i].rating ;
						// review_overview_allrating_col2_span.textContent =
						// descArr[i].rating + " 🟊";
					review_overview_allrating_col2_div.appendChild(
						review_overview_allrating_col2_span
					);

					review_overview_allrating_col2s_span =
						document.createElement("span");
					review_overview_allrating_col2s_span.textContent =
						descArr[i].count;
					review_overview_allrating_col2s_div.appendChild(
						review_overview_allrating_col2s_span
					);

					review_overview_allrating_col8_progress_div =
						document.createElement("div");
					review_overview_allrating_col8_progress_div.className =
						"rsw_progress-ro";
					review_overview_allrating_col8_div.appendChild(
						review_overview_allrating_col8_progress_div
					);

					review_overview_allrating_col8_progress_progressbar_div =
						document.createElement("div");
					review_overview_allrating_col8_progress_progressbar_div.className =
						"rsw_progress-bar-ro";
					review_overview_allrating_col8_progress_progressbar_div.setAttribute(
						"style",
						"width:" + descArr[i].width + "%"
					);
					review_overview_allrating_col8_progress_div.appendChild(
						review_overview_allrating_col8_progress_progressbar_div
					);
				}
			});
		}
	});
	// Dynamically getting starts from loop stars
	const listContainers = document.querySelectorAll('#lisReviewParent .rew_row-list.rew_row_margin-list');
	const maxStars = 5; // Total number of stars
	const percentagePerStar = 100 / maxStars; // Percentage per single star
	listContainers.forEach(container => {
		const starContainer = container.querySelector('.list-star-rating');
		if (starContainer) {
		const listRating = parseFloat(starContainer.getAttribute('data-rating')); // Get the rating percentage
		for (let i = 0; i < maxStars; i++) {
			const star = document.createElement('div');
			star.classList.add('star');
	
			const starFill = document.createElement('div');
			starFill.classList.add('star-fill');
	
			// Calculate fill percentage for each star
			let fillPercentage = Math.max(0, Math.min(100, (listRating - i * percentagePerStar) * maxStars));
			starFill.style.width = `${fillPercentage}%`;
	
			star.appendChild(starFill);
			starContainer.appendChild(star);
		}
		}
	});
	// Dynamically getting starts from loop end
}

async function callReviewOverviewApi(e) {

	let urlValue = e.split("&backgroundcolor");
	clr = urlValue[1].split("#");
	finalBgClr = clr[1].split("&");

	this.backgroundClrRO = "#" + finalBgClr[0];
	this.textClrRO = "#" + clr[2];

	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/PerformanceOverview?Key=" + urlValue[0]
	);

	const myJson = await response.json();
	return myJson;
}