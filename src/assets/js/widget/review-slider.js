var scriptTag_carousel;
var key;
var totalReview;
var excludeReviewNoText;
var miniStar;
var page;
var autoPlay;
var carousel_node;
var carousel_parentNode;
var allScripts;
var carousel_url;
var swiper;
var pageCar = 1;
var carousel_mainNode;
var isSummary = true;
var backgroundClrCarousel = "#000";
var textClrCarousel = "#fff";

(function () {
	
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("review-slider")) {
			let splitUrl = aln.src.split("/");
			// let splitUrlByAnd = splitUrl[6].split("&");
			let splitUrlByAnd = splitUrl[7].split("&");
			let splitAutoplay = splitUrlByAnd[6].split("=");
			this.autoPlay = splitAutoplay[1];
			this.carousel_url = splitUrl[0] + "//" + splitUrl[2] + "/";
		}
	});


	if (this.carousel_url == undefined) {
		this.carousel_url =
			"https://app.grabyourreviews.com/" +
			// "assets/media/review-widget/" + e.reviewSource + ".png";
			"assets/social-logo/" + e.reviewSource + ".png";
			
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
		this.carousel_url + "assets/js/widget/review-slider.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	var link_tag2 = document.createElement("link");
	link_tag2.setAttribute("type", "text/css");
	link_tag2.setAttribute("rel", "stylesheet");
	link_tag2.setAttribute(
		"href",
		this.carousel_url + "assets/js/widget/rew-swipper-bundle.min.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag2);

	var link_tag3 = document.createElement("script");
	link_tag3.setAttribute(
		"src",
		this.carousel_url + "assets/js/widget/rew-swipper-bundle.min.js"
	);
	link_tag3.setAttribute("type", "text/javascript");
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag3);
	
	this.carousel_node = document.createElement("div");
	this.carousel_node.className = "reviewMainDiv";


	this.carousel_mainNode = document.createElement("div");
	this.carousel_mainNode.className = "reviewSummeryMainDiv";
	this.carousel_node.appendChild(carousel_mainNode);


	this.carousel_mainParentSliderNode = document.createElement("div");
	this.carousel_mainParentSliderNode.className = "reviewSliderParentMainDiv";
	this.carousel_node.appendChild(carousel_mainParentSliderNode);

	this.carousel_mainSliderNode = document.createElement("div");
	this.carousel_mainSliderNode.className = "reviewSliderMainDiv";
	this.carousel_mainParentSliderNode.appendChild(carousel_mainSliderNode);

	this.carousel_parentNode = document.createElement("div");
	this.carousel_parentNode.className = "swiper mySwiper";
	this.carousel_mainSliderNode.appendChild(carousel_parentNode);

	carousel_node_sumarryParent_div = document.createElement("div");
	carousel_node_sumarryParent_div.id = "grid_summary";
	carousel_mainNode.appendChild(carousel_node_sumarryParent_div);
	

	carousel_loaderNode = document.createElement("div");
	carousel_loaderNode.className = "rew_loaderParent_carousel";
	carousel_loaderNode.id = "loaderParent_carousel";
	this.carousel_parentNode.appendChild(carousel_loaderNode);

	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_REVIEW_SLIDER"
		) {
			scriptTag_carousel = aln;
			setTimeout(() => {
				scriptTag_carousel.parentNode.insertBefore(
					this.carousel_node,
					scriptTag_carousel.nextSibling
				);
			}, 2000);
		}
	});


	carousel_loaderImg = document.createElement("img");
	carousel_loaderImg.src = this.carousel_url + "assets/images/loading-star.gif";
	carousel_loaderImg.className = "rew_loaderChild_carousel";
	carousel_loaderNode.appendChild(carousel_loaderImg);

	setTimeout(() => {
		getCarouselReview();
	}, 2000);
})();

function getCarouselReview() {
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("review-slider")) {
			let splitUrl = aln.src.split("/");
			this.carousel_url = splitUrl[0] + "//" + splitUrl[2] + "/";
			// this.carousel_url =  "C:/Users/LENOVO/Downloads/wigets-new/";

			let split1 = aln.src.split("accesskey=");
			var apiData = callCarouselApi(split1[1]);
			apiData.then((e) => {
				// if (e.success) {
				var carousel_loaderDiv = document.getElementById(
					"loaderParent_carousel"
				);
				carousel_loaderDiv.setAttribute("style", "display:none");
				bindCarouselData(e);
				// }
			});
		}
	});
}

function bindCarouselData(data) {
	
	// //review summary
	if (this.isSummary) {
		grid_summary_div_row = document.createElement("div");
		grid_summary_div_row.className = "rew_row";
		carousel_node_sumarryParent_div.appendChild(grid_summary_div_row);

		grid_summary_div_col6 = document.createElement("div");
		grid_summary_div_col6.className = "rew_col-6 rew-p-r-l";
		grid_summary_div_row.appendChild(grid_summary_div_col6);

		grid_summary_div_col6_p = document.createElement("p");
		grid_summary_div_col6_p.textContent = "Customer reviews on Google";
		grid_summary_div_col6_p.className = "rew_grid_p";
		grid_summary_div_col6.appendChild(grid_summary_div_col6_p);

		grid_summary_div_col6_div = document.createElement("div");
		grid_summary_div_col6_div.setAttribute(
			"style",
			"display: inline-flex;align-items: center;"
		);
		grid_summary_div_col6_div.id = "summary";
		grid_summary_div_col6.appendChild(grid_summary_div_col6_div);

		

		// New Stars starts
		grid_summary_star_inner_star_div = document.createElement("div");
		grid_summary_star_inner_star_div.className = "star-rating";
		grid_summary_star_inner_star_div.setAttribute("data-rating",  (data.averageRating * 100) / 5 );
		grid_summary_div_col6_div.appendChild(grid_summary_star_inner_star_div);

		const starContainer = document.querySelector('.star-rating');
		const rating = parseFloat(starContainer.getAttribute('data-rating')); // Get the rating percentage
		const maxStars1 = 5; // Total number of stars
		const percentagePerStar1 = 100 / maxStars1; // Percentage per single star

		for (let i = 0; i < maxStars1; i++) {
			const star = document.createElement('div');
			star.classList.add('star');
			const starFill = document.createElement('div');
			starFill.classList.add('star-fill');

			// Calculate fill percentage for each star
			let fillPercentage = Math.max(0, Math.min(100, (rating - i * percentagePerStar1) * maxStars1));
			starFill.style.width = `${fillPercentage}%`;


			starFill.setAttribute("style", "width:" + fillPercentage + "%");
			// review_badge_star_outer_span.appendChild(review_badge_star_inner_span);

			star.appendChild(starFill);
			starContainer.appendChild(star);
		}

		grid_summary_div_col6_div_span = document.createElement("span");
		grid_summary_div_col6_div_span.textContent =" " + data.averageRating + " Rating of " + data.totalReviews + " Reviews"; 
		grid_summary_div_col6_div_span.className = "rew_grid_reviewCount";
		grid_summary_div_col6_div.appendChild(grid_summary_div_col6_div_span);

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

	
	reviewCarouselData = data.rvwDetails.data;

	// var carousel_node = this.carousel_node;

	carousel_node2 = document.createElement("div");
	carousel_node2.className = "swiper-wrapper";
	carousel_node2.id = "swiper-wrapper";
	carousel_parentNode.appendChild(carousel_node2);

	reviewCarouselData.forEach((e) => {
		carousel_node3 = document.createElement("div");
		carousel_node3.className = "swiper-slide";
		carousel_node3.setAttribute(
			"style",
			"background:" +
				this.backgroundClrCarousel +
				";color:" +
				this.textClrCarousel +
				";"
		);
		if (this.autoPlay == "true") {
			carousel_node3.setAttribute("onmouseover", "stopAutoPlay()");
			carousel_node3.setAttribute("onmouseout", "startAutoPlay()");
		}
		carousel_node2.appendChild(carousel_node3);

		carousel_node4 = document.createElement("div");
		carousel_node4.className = "rew_width-50_carousel";
		carousel_node3.appendChild(carousel_node4);

		//add profile image
		var carousel_img = document.createElement("img");
		carousel_img.src = e.profileImgUrl;
		carousel_img.setAttribute("onerror", "myCarouselFunction(this)");
		carousel_img.className = "rew_profile-img_carousel";
		carousel_node4.appendChild(carousel_img);


		//add reviewer name
		var carousel_node7 = document.createElement("div");
		carousel_node7.className = "rew_reviewer-name_carousel";
		carousel_node7.textContent = e.reviewBy;
		carousel_node4.appendChild(carousel_node7);

		//add review date
		function timeElapsedMonthsYears(dateString) {
			const now = new Date();
			const date = new Date(dateString);
			const diffTime = Math.abs(now - date);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
			const months = Math.floor(diffDays / 30);
			const years = Math.floor(months / 12);
			const remainingMonths = months % 12;
		
			let result = '';
			if (months > 12) {
				result = years + ' year' + (years > 1 ? 's' : '');
				if (remainingMonths > 0) {
					result += ' and ' + remainingMonths + ' month' + (remainingMonths > 1 ? 's' : '');
				}
			} else {
				result = months + ' month' + (months > 1 ? 's' : '');
			}
		
			return result + ' ago';
		}

	
		var carousel_node8 = document.createElement("div");
		carousel_node8.className = "rew_review-date_carousel";
		carousel_node8.textContent = timeElapsedMonthsYears(e.date);
		carousel_node4.appendChild(carousel_node8);

		// add rating stars
		carousel_summary_star_inner_star_div = document.createElement("div");
		carousel_summary_star_inner_star_div.className = "carousel-star-rating";
		carousel_summary_star_inner_star_div.setAttribute("data-rating",  (e.rating * 100) / 5 );
		carousel_node4.appendChild(carousel_summary_star_inner_star_div);


		//add review content
		var carousel_node6 = document.createElement("div");

		if (e.reviewDetails) {
			if (e.reviewDetails.length > 150) {
				carousel_node6.className =
					"rew_mt-5_carousel rew_review-more_carousel";
			} else {
				carousel_node6.className =
					"rew_mt-5_carousel rew_review_carousel";
			}
		}

		carousel_node6.innerHTML = e.reviewDetails;
		carousel_node4.appendChild(carousel_node6);

		
		//add review platform
		var carousel_node9 = document.createElement("div");
		carousel_node9.className = "rew_verified_carousel";
		// carousel_node9.textContent =
			// e.reviewSource != "Other"
			// 	? "Verified on  "
			// 	: "Verified by business";
		carousel_node4.appendChild(carousel_node9);
		// carousel_node9.appendChild(document.createTextNode("\u00A0"));
		if (e.reviewSource != "Other") {
			var carousel_node10 = document.createElement("img");
			carousel_node10.className = "rew_platform-img_carousel";
			carousel_node10.src =
//  this.carousel_url + "assets/media/review-widget/" + e.reviewSource + ".png";
 this.carousel_url + "assets/social-logo/" + e.reviewSource + ".png";

				
			carousel_node9.appendChild(carousel_node10);
		}
	});
	// Dynamically getting starts from loop stars
	const listContainers = document.querySelectorAll('.swiper-slide .rew_width-50_carousel');
	const maxStars = 5; // Total number of stars
	const percentagePerStar = 100 / maxStars; // Percentage per single star
	listContainers.forEach(container => {
		const starContainer = container.querySelector('.carousel-star-rating');
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
	addReadMoreLess()
	

	carousel_nodeNextBtn = document.createElement("div");
	carousel_nodeNextBtn.className = "swiper-button-next";
	carousel_mainParentSliderNode.appendChild(carousel_nodeNextBtn);

	carousel_nodePrevBtn = document.createElement("div");
	carousel_nodePrevBtn.className = "swiper-button-prev";
	carousel_mainParentSliderNode.appendChild(carousel_nodePrevBtn);

	//new code powered by

	if (data.isBranding) {
		carousel_poweredByParent_div = document.createElement("div");
		carousel_poweredByParent_div.className = "rew_grid-powerByNew";
		carousel_node.appendChild(carousel_poweredByParent_div);

		carousel_poweredBy_p = document.createElement("p");
		carousel_poweredBy_p.textContent = "Powered By";
		carousel_poweredBy_p.setAttribute("onclick","redirectToBrandingCar()")
		carousel_poweredBy_p.setAttribute(
			"style",
			"cursor:pointer;font-size: 13px !important;"
		);
		carousel_poweredByParent_div.appendChild(carousel_poweredBy_p);

		carousel_poweredBy_img = document.createElement("img");
		carousel_poweredBy_img.src =
		this.carousel_url +
			"assets/images/Logo_Back_Transparent.svg";
		carousel_poweredBy_img.setAttribute(
			"style",
			"margin-left: 0.5%;margin-top: 2%;width: 100px !important;"
		);
		carousel_poweredBy_p.appendChild(carousel_poweredBy_img);
	}

	this.swiper = new Swiper(".mySwiper", {
		slidesPerView: 4, 
		spaceBetween: 20,  
		loop: true,
		autoplay: {
			delay: 3000,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 10
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2,
				spaceBetween: 10
			},
			// when window width is >= 768px
			768: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			// when window width is >= 1024px
			1024: {
				slidesPerView: 4,
				spaceBetween: 10
			}
		}
	});

	if (autoPlay === "true") {
		this.swiper.autoplay.start();
	} 
	else {
		this.swiper.autoplay.stop();
	}
		
}



function myCarouselFunction(e) {
	e.setAttribute(
		"src",
		this.carousel_url + "assets/images/default_image.jpg"
	);
}

async function callCarouselApi(e) {
	let tempVal = e.split("&");
	let urlValue = e.split("&backgroundcolor=");
	clr = urlValue[1].split("#");
	finalBgClr = clr[1].split("&");
	this.backgroundClrCarousel = "#" + finalBgClr[0];
	let tempClrVal = e.split("&textcolor=");
	let tempClr = tempClrVal[1].split("&");
	this.textClrCarousel = tempClr[0];
	const response = await fetch(
		"https://apiv2.grabyourreviews.com/api/GetReviewsDetail?key=" +
			tempVal[0] +
			"&pageNumber=" +
			this.pageCar +
			"&pageSize=" +
			tempVal[3].split("totalreviews=")[1] +
			"&showEmptyReview=" +
			tempVal[4].split("excludereviewnotext=")[1] +
			"&minStars=" +
			tempVal[5].split("ministars=")[1]
	);
	const myJson = await response.json();
	return myJson;
}

function stopAutoPlay() {
	this.swiper.autoplay.stop();
}

function startAutoPlay() {
	this.swiper.autoplay.start();
}

function redirectToBrandingCar() {
	window.open("https://grabyourreviews.com/?utm_source=widget", "_blank");
}




	// Function to add "Read more" and "Read less" functionality
	function addReadMoreLess() {
		// debugger;
		// Select all elements with class "rew_review-details-grid"
		var reviewElements23 = document.querySelectorAll('.rew_review-more_carousel');
    
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
				readMoreLink.innerHTML = '<br>  <a href="#" class="rew_read-more-link">See more</a>';
				element.appendChild(readMoreLink);
				
				var readMoreLinkInner = element.querySelector('.rew_read-more-link');
				var remainingTextSpan = element.querySelector('.rew_remaining-text');
				
				// Add event listener to "Read more" link
				readMoreLinkInner.addEventListener('click', function(event) {
					event.preventDefault(); // Prevent default link behavior
					if (remainingTextSpan.style.display === "none") {
						remainingTextSpan.style.display = "inline"; // Show the remaining text
						readMoreLinkInner.textContent = '- See less'; // Change link text to "Read less"
					} else {
						remainingTextSpan.style.display = "none"; // Hide the remaining text
						readMoreLinkInner.textContent = '+ See more'; // Change link text back to "Read more"
					}
				});
			}
		});
	}
	// addReadMoreLess();

	document.addEventListener('DOMContentLoaded', function() {
		// addReadMoreLess();
	});