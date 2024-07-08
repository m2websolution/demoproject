var scriptTag_list;
var list_node;
var allScripts;
var list_url;
var list_summary_node;
var backgroundClrList = "#000";
var textClrList = "#fff";
var list_totalReviewCount = "";
var list_page = 1;
var list_totalReviewAvail = 100;
var list_isShowBranding = true;
var list_split1 = "";
var list_isSummary = true;
var pageList = 1;

(function () {
	var allScripts = Array.from(document.getElementsByTagName("script"));

	allScripts.forEach((aln) => {
		if (aln.src.includes("widget-list")) {
			let splitUrl = aln.src.split("/");
			this.list_url = splitUrl[0] + "//" + splitUrl[2] + "/";
		}
	});

	if (this.list_url == undefined) {
		this.list_url =
			"https://app.grabyourreviews.com/" +
			"assets/media/review-widget/" + e.reviewSource + ".png";
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
		this.list_url + "assets/js/widget/widget-list.css"
	);
	(
		document.getElementsByTagName("head")[0] || document.documentElement
	).appendChild(link_tag);

	var meta = document.createElement("meta");
	(meta.name = "viewport"),
		(meta.content = "width=device-width, initial-scale=1.0");
	document.getElementsByTagName("head")[0].appendChild(meta);

	this.list_node = document.createElement("div");
	this.list_node.className = "rew_widget_list";

	list_loaderNode = document.createElement("div");
	list_loaderNode.className = "rew_loaderParent_list";
	list_loaderNode.id = "loaderParent_list";
	this.list_node.appendChild(list_loaderNode);

	this.allScripts = Array.from(document.getElementsByTagName("script"));
	this.allScripts.forEach((aln) => {
		if (
			aln.getAttribute("data-set") != undefined &&
			aln.getAttribute("data-set") == "RSW_REVIEW_LIST"
		) {
			scriptTag_list = aln;
			setTimeout(() => {
				scriptTag_list.parentNode.insertBefore(
					this.list_node,
					scriptTag_list.nextSibling
				);
			}, 2000);
		}
	});

	list_loaderImg = document.createElement("img");
	list_loaderImg.src =
		this.list_url + "assets/images/loading-star.gif";
	list_loaderImg.className = "rew_loaderChild_list";
	list_loaderNode.appendChild(list_loaderImg);

	setTimeout(() => {
		getReviewList();
	}, 2000);
})();

function getReviewList() {
	var reviewData;
	var allScripts = Array.from(document.getElementsByTagName("script"));
	allScripts.forEach((aln) => {
		if (aln.src.includes("widget-list")) {
			let splitUrl = aln.src.split("/");
			this.list_url = splitUrl[0] + "//" + splitUrl[2] + "/";
			let split1 = aln.src.split("accesskey=");
			this.list_split1 = split1[1];
			var apiData = callListApi();
			apiData.then((e) => {
				// if (e.success) {
				var list_loaderDiv =
					document.getElementById("loaderParent_list");
					
					if(list_loaderDiv != null){

						list_loaderDiv.setAttribute("style", "display:none");
					}
					bindListData(e, false);
				// }
			});
		}
	});
}

function bindListData(data, val) {
	if (val == false) {
		reviewDataList = data.data.reviews;
	} else {
		document.getElementById("lisReviewParent").remove();

		if (this.list_isSummary) {
			document.getElementById("list_summary").remove();
		}

		if (data.isBranding) {
			document.getElementsByClassName("list_powerBy")[0].remove();
		}

		document.getElementById("list_loadMoreBtn").remove();
	}

	var list_node = this.list_node;

	list_sumarryParent_div = document.createElement("div");
	list_sumarryParent_div.id = "list_summary";
	list_node.appendChild(list_sumarryParent_div);

	//review summary
	if (this.list_isSummary) {
		list_summary_div_row = document.createElement("div");
		list_summary_div_row.className = "rew_row";
		list_sumarryParent_div.appendChild(list_summary_div_row);

		list_summary_div_col6 = document.createElement("div");
		list_summary_div_col6.className = "rew_col-6 rew-p-r-l";
		list_summary_div_row.appendChild(list_summary_div_col6);

		list_summary_div_col6_p = document.createElement("p");
		list_summary_div_col6_p.textContent = "Overall Rating";
		list_summary_div_col6_p.className = "rew_list_p";
		list_summary_div_col6.appendChild(list_summary_div_col6_p);

		list_summary_div_col6_div = document.createElement("div");
		list_summary_div_col6_div.setAttribute(
			"style",
			"display: inline-flex;align-items: center;"
		);
		list_summary_div_col6_div.id = "summary";
		list_summary_div_col6.appendChild(list_summary_div_col6_div);

		list_summary_div_col6_div_span = document.createElement("span");
		list_summary_div_col6_div_span.textContent = data.averageRating;
		list_summary_div_col6_div_span.className = "rew_list_reviewCount";
		list_summary_div_col6_div.appendChild(list_summary_div_col6_div_span);

		// list_summary_star_outer_span = document.createElement("span");
		// list_summary_star_outer_span.className = "stars-outer-list";
		// list_summary_div_col6_div.appendChild(list_summary_star_outer_span);

		// list_summary_star_inner_span = document.createElement("span");
		// list_summary_star_inner_span.className = "stars-inner-list";
		// list_summary_star_inner_span.setAttribute(
		// 	"style",
		// 	"width:" + (data.averageRating * 100) / 5 + "%"
		// );
		// list_summary_star_outer_span.appendChild(list_summary_star_inner_span);

		// New Star starts
		grid_summary_star_inner_star_div = document.createElement("div");
		grid_summary_star_inner_star_div.className = "star-rating";
		grid_summary_star_inner_star_div.setAttribute("data-rating",  (e.rating * 100) / 5 );
		list_summary_div_col6_div.appendChild(grid_summary_star_inner_star_div);
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
		// New Star end


		list_sumarryParent_div_div = document.createElement("div");
		list_sumarryParent_div_div.textContent = data.totalReviews + " Reviews";
		list_sumarryParent_div_div.className = "rew_list-reviewCount";
		list_summary_div_col6.appendChild(list_sumarryParent_div_div);

		list_summary_div_col6_2 = document.createElement("div");
		list_summary_div_col6_2.className = "rew_col-6 rew-p-r-l";
		list_summary_div_col6_2.setAttribute("style", "text-align: right;");
		list_summary_div_row.appendChild(list_summary_div_col6_2);

		list_summary_div_col6_2_btn = document.createElement("a");
		list_summary_div_col6_2_btn.textContent = "Leave a review";
		list_summary_div_col6_2_btn.href = data.reviewPageURL;
		list_summary_div_col6_2_btn.target = "_blank";
		list_summary_div_col6_2_btn.className = "rew_list_leaveReview-btn";
		list_summary_div_col6_2.appendChild(list_summary_div_col6_2_btn);
	}
	// review sumarry end

	list_reviewParent_div = document.createElement("div");
	list_reviewParent_div.id = "lisReviewParent";
	list_node.appendChild(list_reviewParent_div);

	reviewDataList.forEach((e) => {
		list_node1 = document.createElement("div");
		list_node1.className = "rew_row-list rew_row_margin-list";
		list_reviewParent_div.appendChild(list_node1);

		list_node2 = document.createElement("div");
		list_node2.className = "rew_list_parent-list";
		list_node2.setAttribute(
			"style",
			"background:" +
				this.backgroundClrList +
				";color:" +
				this.textClrList +
				";"
		);
		list_node1.appendChild(list_node2);

		list_node3 = document.createElement("div");
		list_node3.className = "rew_row-list";
		// list_node3.setAttribute("style", "border-bottom: 1px solid #efefefb8;");
		list_node2.appendChild(list_node3);

		list_node4 = document.createElement("div");
		list_node4.className = "rew_col-1-list rew_col-12-list";
		list_node3.appendChild(list_node4);

		var list_profileImg = document.createElement("img");
		list_profileImg.src = e.profileImgUrl;
		list_profileImg.className = "rew_profile_img-list";
		list_profileImg.setAttribute("onerror", "myListFunction(this)");
		list_node4.appendChild(list_profileImg);

		list_node5 = document.createElement("div");
		list_node5.className =
			"rew_col-4-list rew_profile_info-list rew_col-12-list";
		list_node3.appendChild(list_node5);

		list_node6 = document.createElement("b");
		list_node6.textContent = e.reviewBy;
		list_node5.appendChild(list_node6);

		list_node7 = document.createElement("span");
		list_node7.textContent = e.date;
		list_node5.appendChild(list_node7);

		list_node8 = document.createElement("div");
		list_node8.className =
			"rew_col-7-list rew_rating_parent-list rew_col-12-list";
		list_node3.appendChild(list_node8);

		list_ratingNode = document.createElement("div");
		list_ratingNode.className = "rew_rating-list";
		list_node8.appendChild(list_ratingNode);

		// list_star_outer_span = document.createElement("span");
		// list_star_outer_span.className = "stars-outer-list";
		// list_ratingNode.appendChild(list_star_outer_span);

		// list_star_inner_span = document.createElement("span");
		// list_star_inner_span.className = "stars-inner-list";
		// list_star_inner_span.setAttribute(
		// 	"style",
		// 	"width:" + (e.rating * 100) / 5 + "%"
		// );
		// list_star_outer_span.appendChild(list_star_inner_span);

		// New Stars starts
		list_summary_star_inner_star_div = document.createElement("div");
		list_summary_star_inner_star_div.className = "list-star-rating";
		list_summary_star_inner_star_div.setAttribute("data-rating",  (e.rating * 100) / 5 );
		list_ratingNode.appendChild(list_summary_star_inner_star_div);
		// New Stars end

		if (e.reviewDetails) {
			list_node9 = document.createElement("div");
			list_node9.className = "rew_row-list";
			list_node2.appendChild(list_node9);
			list_node10 = document.createElement("p");
			list_node10.className = "rew_review_details-list";
			list_node10.innerHTML = e.reviewDetails;
			list_node9.appendChild(list_node10);

			var list_node11 = document.createElement("div");
		list_node11.className = "rew_verified-list";
		list_node11.textContent =
			e.reviewSource != "Other"
				? " "
				: "Verified by business";
		// list_node11.setAttribute("style","color:"+this.backgroundClr+";background:"+this.textClr+";")
		list_node9.appendChild(list_node11);
		}

		
		list_node11.appendChild(document.createTextNode("\u00A0"));

		if (e.reviewSource != "Other") {
			var list_node12 = document.createElement("img");
			list_node12.className = "rew_platform-img-list";
			list_node12.src =
			this.list_url + "assets/social-logo/" + e.reviewSource + ".png";
				
			list_node11.appendChild(list_node12);
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


	if (this.list_totalReviewCount == "0") {
		list_loadMore_div = document.createElement("div");
		list_loadMore_div.id = "list_loadMoreBtn";
		list_loadMore_div.setAttribute("style", "text-align:center;");
		list_node.appendChild(list_loadMore_div);

		list_loadMore_btn = document.createElement("button");
		list_loadMore_btn.textContent = "Load more reviews";
		list_loadMore_btn.setAttribute("onclick", "loadMoreListReviews()");
		list_loadMore_btn.className = "rew_list-loadMoreBtn";
		list_loadMore_btn.id = "rew_list-loadMoreBtn";
		list_loadMore_div.appendChild(list_loadMore_btn);
	}
	
	if (data.isBranding) {
		list_poweredByParent_div = document.createElement("div");
		list_poweredByParent_div.className = "list_powerBy";
		list_node.appendChild(list_poweredByParent_div);

		list_poweredBy_p = document.createElement("p");
		list_poweredBy_p.setAttribute("onclick", "redirectToBrandingList()");
		list_poweredBy_p.textContent = "Powered By ";
		list_poweredBy_p.setAttribute(
			"style",
			"cursor:pointer;font-size: 13px !important;"
		);
		list_poweredByParent_div.appendChild(list_poweredBy_p);

		list_poweredBy_img = document.createElement("img");
		list_poweredBy_img.src =
		this.list_url  +
		"assets/images/Logo_Back_Transparent.svg";
		list_poweredBy_img.setAttribute(
			"style",
			"margin-left: 0.5%;margin-top: 2%;width: 100px !important;"
		);
		list_poweredBy_p.appendChild(list_poweredBy_img);
	}

}

function myListFunction(e) {
	e.setAttribute(
		"src",
		this.list_url + "assets/images/default_image.jpg"
	);
}

async function callListApi() {
	let list_urlValue = this.list_split1.split("&backgroundcolor");

	let totalReview = list_urlValue[1].split("&totalreviews=");
	let tempVal = totalReview[1].split("&");
	this.list_totalReviewCount = tempVal[0];
	clr = list_urlValue[1].split("#");
	finalBgClr = clr[1].split("&");
	this.backgroundClrList = "#" + finalBgClr[0];
	tempClr = clr[2].split("&");
	this.textClrList = "#" + tempClr[0];

	isSummaryTemp = clr[2].split("issummary=");
	this.list_isSummary = JSON.parse(isSummaryTemp[1]);
	let pageSize = tempVal[0] == "0" ? 100 : tempVal[0];

	const response = await fetch(
		"https://dev-azurefunction20240603151829.azurewebsites.net/GetReviewDetail?key=" +
		
			list_urlValue[0] +
			"&pageNumber=" +
			this.list_page +
			"&pageSize=" +
			pageSize +
			"&showEmptyReview=" +
			tempVal[1].split("excludereviewnotext=")[1] +
			"&minStars=" +
			tempVal[2].split("ministars=")[1]
	);
	const myJson = await response.json();
	return myJson;
}

function loadMoreListReviews() {
	document.getElementById("rew_list-loadMoreBtn").innerHTML = "Loading...";
	this.list_page++;
	let getMoreListData = this.callListApi();
	getMoreListData.then((e) => {
		if (e.rvwDetails.succeeded) {
			document.getElementById("rew_list-loadMoreBtn").innerHTML =
				"Load more reviews";

			for (let i = 0; i < e.rvwDetails.data.length; i++) {
				this.reviewDataList.push(e.rvwDetails.data[i]);
			}

			if (
				e.rvwDetails.data.length == 0 ||
				e.rvwDetails.data.length == null
			) {
				document.getElementById("rew_list-loadMoreBtn").remove();
				return;
			}

			this.bindListData(e, true);
		} else {
			document.getElementById("rew_list-loadMoreBtn").innerHTML =
				"Load more reviews";
		}
	});
}

function redirectToBrandingList() {
	window.open("https://grabyourreviews.com/?utm_source=widget", "_blank");
}