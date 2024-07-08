var scriptTag_grid;
var summary_node;
var grid_node;
var allScripts;
var grid_url = "";
var backgroundClrGrid = "#fff";
var textClrGrid = "#000";
var totalReviewCount = "";
var page = 1;
var totalReviewAvail = 100;
var isShowBranding = true;
var split1 = "";
var isSummary = true;

(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("widget-grid")) {
			let splitUrl = aln.src.split("/");
			this.grid_url = splitUrl[0] + "//" + splitUrl[2] + "/";
		}
	});

	if (this.grid_url == undefined) {
		this.grid_url =
			"https://app.grabyourreviews.com/" +
			"assets/images/" +
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
		this.grid_url + "assets/js/widget/widget-grid.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	this.grid_node = document.createElement("div");
	this.grid_node.setAttribute("style", "margin: 2% 0%;");
	grid_loaderNode = document.createElement("div");
	grid_loaderNode.className = "rew_loaderParent_grid";
	grid_loaderNode.id = "loaderParent_grid";
	this.grid_node.appendChild(grid_loaderNode);

	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_REVIEW_GRID"
		) {
			scriptTag_grid = aln;
			setTimeout(() => {
				scriptTag_grid.parentNode.insertBefore(
					this.grid_node,
					scriptTag_grid.nextSibling
				);
			}, 2000);
		}
	});

	grid_loaderImg = document.createElement("img");
	grid_loaderImg.src =
		this.grid_url + "assets/images/loading-star.gif";
	grid_loaderImg.className = "rew_loaderChild_grid";
	grid_loaderNode.appendChild(grid_loaderImg);

	setTimeout(() => {
		getGridReview();
	}, 2000);
})();

function getGridReview() {
	var reviewData;
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("widget-grid")) {
			var split1 = aln.src.split("accesskey=");
			this.split1 = split1[1];
			var apiData = callGridApi();
			apiData.then((e) => {
				// if (e.success) {
				var grid_loaderDiv =
					document.getElementById("loaderParent_grid");
				grid_loaderDiv.setAttribute("style", "display:none");
				bindGridData(e, false);
				// }
			});
		}
	});
}

let reviewGridData = [];

function bindGridData(data, val) {
	if (val == false) {
		this.reviewGridData = data.data.reviews;
	} else {
		document.getElementsByClassName("rew_grid-container-grid")[0].remove();
		document.getElementById("grid_summary").remove();
		//document.getElementsByClassName("rew_grid-powerBy")[0].remove();

		document.getElementById("grid_loadMoreBtn").remove();
	}
	//Commented by Snehal
	// console.log(data.isBranding);
	// if (!data.isBranding) {
	// 	document.getElementsByClassName("rew_grid-powerBy")[0].remove();
	// }
	var grid_node = this.grid_node;

	grid_sumarryParent_div = document.createElement("div");
	grid_sumarryParent_div.id = "grid_summary";
	grid_node.appendChild(grid_sumarryParent_div);

	//review summary
	if (this.isSummary) {
		grid_summary_div_row = document.createElement("div");
		grid_summary_div_row.className = "rew_row";
		grid_sumarryParent_div.appendChild(grid_summary_div_row);

		grid_summary_div_col6 = document.createElement("div");
		grid_summary_div_col6.className = "rew_col-6 rew-p-r-l";
		grid_summary_div_row.appendChild(grid_summary_div_col6);

		grid_summary_div_col6_p = document.createElement("p");
		grid_summary_div_col6_p.textContent = "Overall Rating";
		grid_summary_div_col6_p.className = "rew_grid_p";
		grid_summary_div_col6.appendChild(grid_summary_div_col6_p);

		grid_summary_div_col6_div = document.createElement("div");
		grid_summary_div_col6_div.setAttribute(
			"style",
			"display: inline-flex;align-items: center;"
		);
		grid_summary_div_col6_div.id = "summary";
		grid_summary_div_col6.appendChild(grid_summary_div_col6_div);

		grid_summary_div_col6_div_span = document.createElement("span");
		grid_summary_div_col6_div_span.textContent = data.averageRating;
		grid_summary_div_col6_div_span.className = "rew_grid_reviewCount";
		grid_summary_div_col6_div.appendChild(grid_summary_div_col6_div_span);

		// grid_summary_star_outer_span = document.createElement("span");
		// grid_summary_star_outer_span.className = "stars-outer-grid";
		// grid_summary_div_col6_div.appendChild(grid_summary_star_outer_span);

		// grid_summary_star_inner_span = document.createElement("span");
		// grid_summary_star_inner_span.className = "stars-inner-grid";
		// grid_summary_star_inner_span.setAttribute(
		// 	"style",
		// 	"width:" + (data.averageRating * 100) / 5 + "%"
		// );
		// grid_summary_star_outer_span.appendChild(grid_summary_star_inner_span);

		// New Stars starts
		grid_summary_star_inner_star_div = document.createElement("div");
		grid_summary_star_inner_star_div.className = "star-rating";
		grid_summary_star_inner_star_div.setAttribute("data-rating",  (data.averageRating * 100) / 5 );
		grid_summary_div_col6_div.appendChild(grid_summary_star_inner_star_div);

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
		// New Stars End


		grid_sumarryParent_div_div = document.createElement("div");
		grid_sumarryParent_div_div.textContent = data.totalReviews + " Reviews";
		grid_sumarryParent_div_div.className = "rew_grid-reviewCount";
		grid_summary_div_col6.appendChild(grid_sumarryParent_div_div);

		grid_summary_div_col6_2 = document.createElement("div");
		grid_summary_div_col6_2.className = "rew_col-6 rew-p-r-l";
		grid_summary_div_col6_2.setAttribute("style", "text-align: right;");
		grid_summary_div_row.appendChild(grid_summary_div_col6_2);

		grid_summary_div_col6_2_btn = document.createElement("a");
		grid_summary_div_col6_2_btn.textContent = "Leave a review";
		grid_summary_div_col6_2_btn.href = data.reviewPageURL;
		grid_summary_div_col6_2_btn.target = "_blank";
		grid_summary_div_col6_2_btn.className = "rew_grid_leaveReview-btn";
		grid_summary_div_col6_2.appendChild(grid_summary_div_col6_2_btn);
	}
	// review sumarry end

	grid_reviewParent_div = document.createElement("div");
	grid_reviewParent_div.className = "rew_grid-container-grid";
	grid_node.appendChild(grid_reviewParent_div);
	var rating = 0 ;
	this.reviewGridData.forEach((e) => {
		grid_node1 = document.createElement("div");
		grid_node1.className = "rew_masonary_brick-grid";

		  // Create inner container div
		  var innerDiv = document.createElement("div");
		  innerDiv.setAttribute("class", "rew_masonary_brick-grid-2");
		  grid_node1.appendChild(innerDiv);

		  var innerDiv2 = document.createElement("div");
		  innerDiv2.setAttribute("class", "rew_masonary_brick-grid-3");
		  innerDiv.appendChild(innerDiv2);

		  var imgDiv = document.createElement("div");
		  imgDiv.setAttribute("class", "rew_masonary_brick-img-div");
		  innerDiv2.appendChild(imgDiv);


		  var nameDiv = document.createElement("div");
		  nameDiv.setAttribute("class", "rew_masonary_brick-name-div");
		  innerDiv2.appendChild(nameDiv);


		  grid_node1.setAttribute(
			"style",
			"background:" +
				this.backgroundClrGrid +
				";color:" +
				this.textClrGrid +
				";"

		);
		
		grid_reviewParent_div.appendChild(grid_node1);

		grid_profileImg = document.createElement("img");
		grid_profileImg.src = e.profileImgUrl;
		grid_profileImg.setAttribute("onerror", "myGridFunction(this)");
		grid_profileImg.className = "rew_profile-img-grid";
		imgDiv.appendChild(grid_profileImg);

		grid_node3 = document.createElement("b");
		grid_node3.textContent = e.reviewBy;
		grid_node3.className = "rew_reviewer-name-grid";
		nameDiv.appendChild(grid_node3);

		grid_node4 = document.createElement("br");
		nameDiv.appendChild(grid_node4);

		grid_node5 = document.createElement("span");
		grid_node5.textContent = e.date;
		grid_node5.className = "rew_ft-13-grid";
		nameDiv.appendChild(grid_node5);

		grid_node6 = document.createElement("br");
		nameDiv.appendChild(grid_node6);

		// grid_star_outer_span = document.createElement("span");
		// grid_star_outer_span.className = "stars-outer-grid";
		// grid_node1.appendChild(grid_star_outer_span);

		// grid_star_inner_span = document.createElement("span");
		// grid_star_inner_span.className = "stars-inner-grid";
		// grid_star_inner_span.setAttribute(
		// 	"style",
		// 	"width:" + (e.rating * 100) / 5 + "%"
		// );
		// grid_star_outer_span.appendChild(grid_star_inner_span);

		
		// New Star starts
		grid_summary_star_inner_star_div = document.createElement("div");
		grid_summary_star_inner_star_div.className = "grid-star-rating";
		grid_summary_star_inner_star_div.setAttribute("data-rating",  (e.rating * 100) / 5 );
		grid_node1.appendChild(grid_summary_star_inner_star_div);
		// New Star end


		grid_nodeBr = document.createElement("br");
		innerDiv2.appendChild(grid_nodeBr);

		grid_node8 = document.createElement("p");
		grid_node8.className = "rew_verified-on-grid";
		innerDiv.appendChild(grid_node8);

		grid_node9 = document.createElement("span");
		grid_node9.textContent =
			e.reviewSource != "Other" ? "" : "";
		grid_node8.appendChild(grid_node9);

		if (e.reviewSource != "Other") {
			grid_reviewPlatformLogo = document.createElement("img");
			grid_reviewPlatformLogo.src =

			this.grid_url +
				"assets/social-logo/" +
				e.reviewSource +
				".png";
			grid_reviewPlatformLogo.className = "rew_review-platform-logo-grid";
			grid_node8.appendChild(grid_reviewPlatformLogo);
		}

		if (e.reviewDetails) {
			grid_node7 = document.createElement("p");
			grid_node7.className = "rew_review-details-grid";
			if (e.reviewDetails?.length < 40) {
				grid_node7.setAttribute(
					"style",
					"width:100%;color:" + this.textClrGrid + ";"
				);
			} else if (e.reviewDetails?.length > 40) {
				grid_node7.setAttribute(
					"style",
					 +
					// "height:70px !important;color:" +
						this.textClrGrid +
						"; font-size: 16px !important;"
				);
			}
			grid_node7.innerHTML = e.reviewDetails;
			grid_node1.appendChild(grid_node7);
		}
	
		rating++; 
	});
	const gridContainers = document.querySelectorAll('.rew_grid-container-grid .rew_masonary_brick-grid');
	const maxStars = 5; // Total number of stars
	const percentagePerStar = 100 / maxStars; // Percentage per single star
  
	gridContainers.forEach(container => {
	  const starContainer = container.querySelector('.grid-star-rating');
	  if (starContainer) {
		const rating = parseFloat(starContainer.getAttribute('data-rating')); // Get the rating percentage
  
		for (let i = 0; i < maxStars; i++) {
		  const star = document.createElement('div');
		  star.classList.add('star');
  
		  const starFill = document.createElement('div');
		  starFill.classList.add('star-fill');
  
		  // Calculate fill percentage for each star
		  let fillPercentage = Math.max(0, Math.min(100, (rating - i * percentagePerStar) * maxStars));
		  starFill.style.width = `${fillPercentage}%`;
  
		  star.appendChild(starFill);
		  starContainer.appendChild(star);
		}
	  }
	});
	
	// document.addEventListener('DOMContentLoaded', function() {
		// debugger;
		addReadMoreLess();
	// });
	// if (val == false) {
	if (this.totalReviewCount == "0") {
		grid_loadMore_div = document.createElement("div");
		grid_loadMore_div.id = "grid_loadMoreBtn";
		grid_loadMore_div.setAttribute("style", "text-align:center;");
		grid_node.appendChild(grid_loadMore_div);

		grid_loadMore_btn = document.createElement("button");
		grid_loadMore_btn.textContent = "Load more reviews";
		grid_loadMore_btn.setAttribute("onclick", "loadMoreReviews()");
		grid_loadMore_btn.className = "rew_grid-loadMoreBtn";
		grid_loadMore_btn.id = "rew_grid-loadMoreBtn";
		grid_loadMore_div.appendChild(grid_loadMore_btn);
	}
	if (data.isBranding) {
		grid_poweredByParent_div = document.createElement("div");
		grid_poweredByParent_div.className = "rew_grid-powerBy";
		grid_node.appendChild(grid_poweredByParent_div);

		grid_poweredBy_p = document.createElement("p");
		grid_poweredBy_p.textContent = "Powered By";
		grid_poweredBy_p.setAttribute("onclick", "redirectToBrandingGrid()");
		grid_poweredBy_p.setAttribute(
			"style",
			"cursor:pointer;font-size: 13px !important;"
		);
		grid_poweredByParent_div.appendChild(grid_poweredBy_p);

		grid_poweredBy_img = document.createElement("img");
		grid_poweredBy_img.src =

		this.grid_url + "assets/images/Logo_Back_Transparent.svg";

		grid_poweredBy_img.setAttribute(
			"style",
			"margin-left: 0.5%;margin-top: 2%;width: 100px !important;"
		);
		grid_poweredBy_p.appendChild(grid_poweredBy_img);
	}
}

function myGridFunction(e) {
	e.setAttribute(
		"src",

		this.grid_url + "assets/images/default_image.jpg"

	);
}

async function callGridApi() {
	let urlValue = this.split1.split("&backgroundcolor");
	let key = urlValue[0];
	let tempIsSummary = urlValue[1].split("&issummary=");
	this.isSummary = JSON.parse(tempIsSummary[1]);
	let totalReview = urlValue[1].split("&totalreviews=");
	let tempVal = totalReview[1].split("&");
	let tempTotalReview = totalReview[1].split("&");
	this.totalReviewCount = tempTotalReview[0];
	clr = urlValue[1].split("#");

	finalBgClr = clr[1].split("&");
	this.backgroundClrGrid = "#" + finalBgClr[0];
	let txtClr = clr[2].split("&");
	this.textClrGrid = "#" + txtClr[0];
	let pageSize =
		txtClr[1].split("totalreviews=")[1] == "0"
			? 100
			: txtClr[1].split("totalreviews=")[1];
	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetReviewDetail?key=" +
			key +
			"&pageNumber=" +
			this.page +
			"&pageSize=" +
			pageSize +
			"&showEmptyReview=" +
			txtClr[2].split("excludereviewnotext=")[1] +
			"&minStars=" +
			txtClr[3].split("ministars=")[1]
	);
	const myJson = await response.json();
	return myJson;
}

function loadMoreReviews() {
	document.getElementById("rew_grid-loadMoreBtn").innerHTML = "Loading...";
	this.page++;
	let getMoreData = this.callGridApi();
	getMoreData.then((e) => {
		if (e.rvwDetails.succeeded) {
			document.getElementById("rew_grid-loadMoreBtn").innerHTML =
				"Load more reviews";

			for (let i = 0; i < e.rvwDetails.data.length; i++) {
				this.reviewGridData.push(e.rvwDetails.data[i]);
			}
			if (
				e.rvwDetails.data.length == 0 ||
				e.rvwDetails.data.length == null
			) {
				document.getElementById("grid_loadMoreBtn").remove();
				return;
			}
			this.bindGridData(e, true);
		} else {
			document.getElementById("rew_grid-loadMoreBtn").innerHTML =
				"Load more reviews";
		}
	});
}

function redirectToBrandingGrid() {
	window.open("https://grabyourreviews.com/?utm_source=widget", "_blank");
}

	// Function to add "Read more" and "Read less" functionality
	function addReadMoreLess() {
		// debugger;
		// Select all elements with class "rew_review-details-grid"
		var reviewElements23 = document.querySelectorAll('.rew_review-details-grid');
    
		reviewElements23.forEach(function(element) {
			var text = element.textContent.trim(); // Get the text content and remove leading/trailing whitespace
			var words = text.split(' '); // Split the text into words
			
			// Check if the text exceeds 30 words
			if (words.length > 30) {
				// Join the first 30 words and add "Read more" link
				var shortenedText = words.slice(0, 30).join(' ');
				var remainingText = words.slice(30).join(' ');
				var html = shortenedText + '<span class="rew_remaining-text" style="display:none"> '+ remainingText +'</span>';
				
				element.innerHTML = html; // Replace the text content with the HTML
				
				var readMoreLink = document.createElement('span');
				readMoreLink.classList.add('rew_read-more');
				readMoreLink.innerHTML = ' ... <a href="#" class="rew_read-more-link">read more</a>';
				element.appendChild(readMoreLink);
				
				var readMoreLinkInner = element.querySelector('.rew_read-more-link');
				var remainingTextSpan = element.querySelector('.rew_remaining-text');
				
				// Add event listener to "Read more" link
				readMoreLinkInner.addEventListener('click', function(event) {
					event.preventDefault(); // Prevent default link behavior
					if (remainingTextSpan.style.display === "none") {
						remainingTextSpan.style.display = "inline"; // Show the remaining text
						readMoreLinkInner.textContent = '- read less'; // Change link text to "Read less"
					} else {
						remainingTextSpan.style.display = "none"; // Hide the remaining text
						readMoreLinkInner.textContent = '+ read more'; // Change link text back to "Read more"
					}
				});
			}
		});
	}
	// addReadMoreLess();

	document.addEventListener('DOMContentLoaded', function() {
		// addReadMoreLess();
	});