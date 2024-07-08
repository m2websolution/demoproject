var scriptTag_carousel;
var key;
var totalReview;
var excludeReviewNoText;
var miniStar;
var page;
var autoPlay;
var carousel_node;
var allScripts;
var carousel_url;
var swiper;
var pageCar = 1;

var backgroundClrCarousel = "#000";
var textClrCarousel = "#fff";

(function () {
	
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("widget-carousel")) {
			let splitUrl = aln.src.split("/");
			let splitUrlByAnd = splitUrl[6].split("&");
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
		this.carousel_url + "assets/js/widget/widget-carousel.css"
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
	this.carousel_node.className = "swiper mySwiper";

	carousel_loaderNode = document.createElement("div");
	carousel_loaderNode.className = "rew_loaderParent_carousel";
	carousel_loaderNode.id = "loaderParent_carousel";
	this.carousel_node.appendChild(carousel_loaderNode);

	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_REVIEW_CAROUSEL"
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
		if (aln.src.includes("widget-carousel")) {
			let splitUrl = aln.src.split("/");
			this.carousel_url = splitUrl[0] + "//" + splitUrl[2] + "/";
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
	
	reviewCarouselData = data.data.reviews;

	var carousel_node = this.carousel_node;

	carousel_node2 = document.createElement("div");
	carousel_node2.className = "swiper-wrapper";
	carousel_node2.id = "swiper-wrapper";
	carousel_node.appendChild(carousel_node2);

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

		//add rating image
		// carousel_star_outer_span = document.createElement("span");
		// carousel_star_outer_span.className = "stars-outer-car";
		// carousel_node4.appendChild(carousel_star_outer_span);

		// carousel_star_inner_span = document.createElement("span");
		// carousel_star_inner_span.className = "stars-inner-car";
		// carousel_star_inner_span.setAttribute(
		// 	"style",
		// 	"width:" + (e.rating * 100) / 5 + "%"
		// );
		// carousel_star_outer_span.appendChild(carousel_star_inner_span);

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

		//add reviewer name
		var carousel_node7 = document.createElement("div");
		carousel_node7.className = "rew_reviewer-name_carousel";
		carousel_node7.textContent = e.reviewBy;
		carousel_node4.appendChild(carousel_node7);

		//add review date
		var carousel_node8 = document.createElement("div");
		carousel_node8.className = "rew_review-date_carousel";
		carousel_node8.textContent = e.date;
		carousel_node4.appendChild(carousel_node8);

		//add review platform
		var carousel_node9 = document.createElement("div");
		carousel_node9.className = "rew_verified_carousel";
		carousel_node9.textContent =
			e.reviewSource != "Other"
				? "Verified on  "
				: "Verified by business";
		carousel_node4.appendChild(carousel_node9);
		carousel_node9.appendChild(document.createTextNode("\u00A0"));
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
	carousel_node.appendChild(carousel_nodeNextBtn);

	carousel_nodePrevBtn = document.createElement("div");
	carousel_nodePrevBtn.className = "swiper-button-prev";
	carousel_node.appendChild(carousel_nodePrevBtn);

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
		autoplay: {
			delay: 3000,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	if (autoPlay == "true") {
		this.swiper.autoplay.start();
	} else {
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
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetReviewDetail?key=" +
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