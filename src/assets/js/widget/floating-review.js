var scriptTag_floatingReview;
var key;
var totalReview;
var excludeReviewNoText;
var miniStar;
var page;
var autoPlay;
var floatingReview_node;
var allScripts;
var floatingReview_url;
var swiperFloatingReview;
var reviewSourceType;
// theme start
var backgroundClrFR;
var textClrFR;
var position;

// theme end
(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("floating-review")) {
			let splitUrl = aln.src.split("/");
			let splitUrlByAnd = splitUrl[6].split("&");
			// let splitUrlByAnd = splitUrl[9].split("&");
			let splitAutoplay = splitUrlByAnd[6].split("=");
			this.position = splitAutoplay[1];
			this.floatingReview_url = splitUrl[0] + "//" + splitUrl[2] + "/";
		}
	});

	if (this.floatingReview_url == undefined) {
		this.floatingReview_url =
			"https://app.grabyourreviews.com/" +
			"assets/social-logo/" +
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
		this.floatingReview_url + "assets/js/widget/floating-review.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	var link_tag2 = document.createElement("link");
	link_tag2.setAttribute("type", "text/css");
	link_tag2.setAttribute("rel", "stylesheet");
	link_tag2.setAttribute(
		"href",
		this.floatingReview_url + "assets/js/widget/rew-swipper-bundle.min.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag2);

	var link_tagFont = document.createElement("link");
	link_tagFont.setAttribute("type", "text/css");
	link_tagFont.setAttribute("rel", "stylesheet");
	link_tagFont.setAttribute(
		"href",
		"https://fonts.googleapis.com/css?family=Varela Round"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tagFont);

	var link_tag3 = document.createElement("script");
	link_tag3.setAttribute(
		"src",
		this.floatingReview_url + "assets/js/widget/rew-swipper-bundle.min.js"
	);
	link_tag3.setAttribute("type", "text/javascript");
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag3);

	if (this.position == "left") {
		this.floatingReview_node = document.createElement("div");
		this.floatingReview_node.className =
			"swiper myFloatingSwiper swiper-demo";
		this.floatingReview_node.setAttribute("style", "display:none;");
	} else if (this.position == "right") {
		this.floatingReview_node = document.createElement("div");
		this.floatingReview_node.className =
			"swiper myFloatingSwiper swiper-demo rightCls";
		//	this.floatingReview_node.setAttribute("style", "right: -62% !important;");
		this.floatingReview_node.setAttribute("style", "display:none;");
	}

	var x = document.getElementsByTagName("body");
	setTimeout(() => {
		const d = this.floatingReview_node;
		x[0].appendChild(d);
	}, 2000);
	setTimeout(() => {
		getFloatingReview();
	}, 2000);
})();

function getFloatingReview() {
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("floating-review")) {
			let splitUrl = aln.src.split("/");
			this.floatingReview_url = splitUrl[0] + "//" + splitUrl[2] + "/";
			let split1 = aln.src.split("accesskey=");
			var apiData = callFloatingReviewApi(split1[1]);
			apiData.then((e) => {
				bindFloatingReviewData(e);
			});
		}
	});
}

function bindFloatingReviewData(data) {
	floatingReviewData = data.data.reviews;
	this.floatingReview_node.setAttribute("style", "display:block;");
	var floatingReview_node = this.floatingReview_node;

	floatingReview_node2 = document.createElement("div");
	floatingReview_node2.id = "swiper-wrapper";
	floatingReview_node2.className = "swiper-wrapper";
	floatingReview_node.appendChild(floatingReview_node2);

	//floatingReviewData = floatingReviewData.slice(0, 3);
	floatingReviewData.forEach((e) => {
		floatingReview_node3 = document.createElement("div");
		floatingReview_node3.className =
			"swiper-slide rew_slide swiper-slide-demo";
		floatingReview_node3.setAttribute(
			"onmouseover",
			"stopFloatingAutoPlay()"
		);
		floatingReview_node3.setAttribute(
			"onmouseout",
			"startFloatingAutoPlay()"
		);
		floatingReview_node3.setAttribute(
			"style",
			"background:" +
				this.backgroundClrFR +
				"!important;color:" +
				this.textClrFR +
				"!important;"
		);
		floatingReview_node2.appendChild(floatingReview_node3);

	

		fr_node6 = document.createElement("div");
		fr_node6.className = "rew_review-fr";
		floatingReview_node3.appendChild(fr_node6);

		fr_node4 = document.createElement("div");
		fr_node4.className = "rew_profile-fr";
		fr_node6.appendChild(fr_node4);

		fr_node5_img = document.createElement("img");
		fr_node5_img.src = e.profileImgUrl;
		fr_node5_img.setAttribute("onerror", "myFloatingReviewFunction(this)");
		fr_node5_img.className = "rew_profile-img-fr";
		fr_node4.appendChild(fr_node5_img);
		fr_span_node = document.createElement("button");
		fr_span_node.textContent = "X";
		fr_span_node.setAttribute("onclick", "closeDemo()");
		fr_span_node.className = "rew_close-fr";
		fr_span_node.style = "font-family: 'Varela Round !important;'";
		fr_node6.appendChild(fr_span_node);

		fr_node7 = document.createElement("b");
		fr_node7.className = "rew_profile-name-fr";
		fr_node7.textContent = e.reviewBy;
		fr_node7.setAttribute("style", "text-transform: capitalize;");
		// fr_node7.setAttribute("style", "font-size: 20px !important;");
		fr_node4.appendChild(fr_node7);

		// fr_node8 = document.createElement("br");
		// fr_node6.appendChild(fr_node8);

		// add new section
		let modal_verifiedon_Main = document.createElement("div");
		modal_verifiedon_Main.className = "rew_review-star-fr";

		modal_verifiedon_Main.setAttribute(
			"style",
			"display: flex; margin-top: 5px"
		);
		fr_node6.appendChild(modal_verifiedon_Main);

		let modal_verifiedon = document.createElement("div");
		modal_verifiedon.className = "modal-verfiedModal";
		modal_verifiedon_Main.appendChild(modal_verifiedon);

		// star section
		// fr_node9_star_outer_span = document.createElement("div");
		// fr_node9_star_outer_span.className = "stars-outer-fr";
		// modal_verifiedon_Main.appendChild(fr_node9_star_outer_span);

		// fr_node9_star_inner_span = document.createElement("span");
		// fr_node9_star_inner_span.className = "stars-inner-fr";
		// fr_node9_star_inner_span.setAttribute(
		// 	"style",
		// 	"width:" + (e.rating * 100) / 5 + "%"
		// );
		// fr_node9_star_outer_span.appendChild(fr_node9_star_inner_span);

		// star section
		floating_review_star_inner_star_div = document.createElement("div");
		floating_review_star_inner_star_div.className = "floating-review-star-rating";
		floating_review_star_inner_star_div.setAttribute("data-rating",  (e.rating * 100) / 5 );
		modal_verifiedon_Main.appendChild(floating_review_star_inner_star_div);

		localStorage.setItem("floatingReview_url", this.floatingReview_url);
		var node4 = document.createElement("p");
		node4.className = "quote";
		if (e.reviewDetails) {
			// node4.innerHTML = e.reviewDetails.substring(0, 80) + "..";
			var linkNode = document.createElement("a");
			linkNode.className = "view-more";
			linkNode.textContent = "Read More";
			linkNode.onclick = function () {
				this.reviewSourceType = e.reviewSource;
				var modal = document.getElementById("floatingDataModal");
				modal.style.display = "block";
				document.getElementById("reviewDetail").innerHTML =
					e.reviewDetails;
				document.getElementById("reviewerProfile").src =
					e.profileImgUrl;
				document.getElementById("reviewName").innerHTML = e.reviewBy;
				document.getElementById("reviewDate").innerHTML = e.date;
				if (e.reviewSource != "Other") {
					let img =
						localStorage.getItem("floatingReview_url") +
						"assets/social-logo/" +
						e.reviewSource +
						".png";
					document.getElementById("platformName").src = img;
					document.getElementById("txtId").style.display = "none";
					document.getElementById("txt").style.display =
						"inline-flex";
				} else {
					document.getElementById("txtId").style.display = "block";
					document.getElementById("txt").style.display = "none";
					document.getElementById("txtId").innerHTML =
						"Verified by business";
				}
			};
			node4.appendChild(linkNode);
		} else {
			var blankNode = document.createElement("p");
			node4.appendChild(blankNode);
		}
		fr_node6.appendChild(node4);

	
		// added verified on unnati

		if (e.reviewSource != "Other") {
			fr_node11_review_platform = document.createElement("img");
			fr_node11_review_platform.className = "rew_review-platform-fr";
			fr_node11_review_platform.src =
				this.floatingReview_url +
				"assets/social-logo/" +
				e.reviewSource +
				".png";
			modal_verifiedon.appendChild(fr_node11_review_platform);
		}
	});
	// Dynamically getting starts from loop stars
	const listContainers = document.querySelectorAll('.swiper-slide .rew_review-fr');
	console.log(listContainers);
	const maxStars = 5; // Total number of stars
	const percentagePerStar = 100 / maxStars; // Percentage per single star
	listContainers.forEach(container => {
	  const starContainer = container.querySelector('.floating-review-star-rating');
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
	

	// modal start

	let fr_modal = document.createElement("div");
	fr_modal.id = "floatingDataModal";
	fr_modal.className = "modalFloat";
	this.floatingReview_node.appendChild(fr_modal);

	let fr_modal_content = document.createElement("div");
	fr_modal_content.className = "modal-content";
	fr_modal_content.style = "text-align: center !important;";
	fr_modal.appendChild(fr_modal_content);

	fr_close_modalBtn = document.createElement("span");
	fr_close_modalBtn.textContent = "X";
	fr_close_modalBtn.className = "fr-modalClsBtn";
	fr_close_modalBtn.setAttribute("onclick", "closeModal()");
	fr_close_modalBtn.style = "font-family: 'Varela Round !important;'";
	fr_modal_content.appendChild(fr_close_modalBtn);

	let fr_modal_profileImg = document.createElement("img");
	fr_modal_profileImg.id = "reviewerProfile";
	fr_modal_profileImg.setAttribute(
		"onerror",
		"myFloatingReviewFunction(this)"
	);
	fr_modal_content.appendChild(fr_modal_profileImg);

	let fr_modal_reviewrName = document.createElement("p");
	fr_modal_reviewrName.id = "reviewName";
	fr_modal_content.appendChild(fr_modal_reviewrName);

	let fr_modal_reviewDate = document.createElement("p");
	fr_modal_reviewDate.id = "reviewDate";
	fr_modal_content.appendChild(fr_modal_reviewDate);

	let fr_modal_review = document.createElement("p");
	fr_modal_review.id = "reviewDetail";
	fr_modal_review.className = "reviewPopupDetail";
	fr_modal_content.appendChild(fr_modal_review);

	let fr_modal_verifiedon1 = document.createElement("div");
	fr_modal_verifiedon1.textContent = "Verified By Business";
	fr_modal_verifiedon1.id = "txtId";
	fr_modal_verifiedon1.className = "modal-verfied";
	fr_modal_content.appendChild(fr_modal_verifiedon1);

	let fr_modal_verifiedon = document.createElement("div");
	fr_modal_verifiedon.textContent = "Verified on";
	fr_modal_verifiedon.id = "txt";
	fr_modal_verifiedon.className = "modal-verfied";
	fr_modal_content.appendChild(fr_modal_verifiedon);

	let fr_modal_verifiedon_reviewPlatform = document.createElement("img");
	fr_modal_verifiedon_reviewPlatform.id = "platformName";
	fr_modal_verifiedon.appendChild(fr_modal_verifiedon_reviewPlatform);

	// added by unnati poweredby 
		if (data.data.isBranding) {
			list_poweredByParent_div = document.createElement("div");
			list_poweredByParent_div.className = "list_powerByFloat";
			fr_modal_content.appendChild(list_poweredByParent_div);

			list_poweredBy_p = document.createElement("p");
			list_poweredBy_p.setAttribute(
				"onclick",
				"redirectToBrandingListFloating()"
			);
			list_poweredBy_p.textContent = "Powered By ";
			list_poweredBy_p.setAttribute(
				"style",
				"cursor:pointer;font-size: 13px !important;"
			);
			list_poweredByParent_div.appendChild(list_poweredBy_p);

			list_poweredBy_img = document.createElement("img");
			list_poweredBy_img.src =
			this.floatingReview_url + "assets/images/Logo_Back_Transparent.svg";
			list_poweredBy_img.setAttribute(
				"style",
				"margin-left: 0.5%;margin-top: 2%;width: 100px !important;"
			);
			list_poweredBy_p.appendChild(list_poweredBy_img);
		}

	// modal end

	fr_btn_next = document.createElement("div");
	fr_btn_next.className = "swiper-button-next";
	fr_btn_next.setAttribute("style", "display:none");
	this.floatingReview_node.appendChild(fr_btn_next);

	fr_btn_prev = document.createElement("div");
	fr_btn_prev.className = "swiper-button-prev";
	fr_btn_prev.setAttribute("style", "display:none");
	this.floatingReview_node.appendChild(fr_btn_prev);
	this.swiperFloatingReview = new Swiper(".myFloatingSwiper", {
		spaceBetween: 15,
		centeredSlides: true,
		autoplay: {
			delay: 5000,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

function myFloatingReviewFunction(e) {
	e.setAttribute(
		"src",
		this.floatingReview_url +"assets/images/default_image.jpg"
	);
}

async function callFloatingReviewApi(e) {
	let urlValue = e.split("&backgroundcolor");
	let key = urlValue[0];
	let totalReview = urlValue[1].split("&totalreviews=")[1];
	clr = urlValue[1].split("#");
	finalBgClr = clr[1].split("&");
	this.backgroundClrFR = "#" + finalBgClr[0];
	this.textClrFR = "#" + clr[2].split("&totalreviews=")[0];
	let param = totalReview.split("&");
	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetReviewDetail?Key=" +
			key +
			"&pageSize=" +
			param[0] +
			"&pageNumber=1&minStars=" +
			param[2].split("ministars=")[1] +
			"&showEmptyReview=" +
			param[1].split("excludereviewnotext=")[1]
	);
	const myJson = await response.json();
	return myJson;
}
function closeDemo() {
	document.getElementsByClassName("myFloatingSwiper")[0].style.display =
		"none";
}
function closeModal() {
	document.getElementById("floatingDataModal").style.display = "none";
}
function stopFloatingAutoPlay() {
	this.swiperFloatingReview.autoplay.stop();
}
function startFloatingAutoPlay() {
	this.swiperFloatingReview.autoplay.start();
}

function redirectToBrandingListFloating() {
	window.open("https://grabyourreviews.com/?utm_source=widget", "_blank");
}