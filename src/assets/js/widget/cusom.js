// var reviewElements = document.querySelectorAll('.rew_review-details-grid');
		
// reviewElements.forEach(function(element) {
//         var text = element.textContent.trim(); // Get the text content and remove leading/trailing whitespace
//         var words = text.split(' '); // Split the text into words
        
//         // Check if the text exceeds 30 words
//         if (words.length > 30) {
//             // Join the first 30 words and add "Read more" link
//             var shortenedText = words.slice(0, 30).join(' ');
//             var remainingText = words.slice(30).join(' ');
//             var html = shortenedText + '<span class="rew_remaining-text" style="display:none">'+ remainingText +'</span><span class="rew_read-more"> ... <a href="#" class="rew_read-more-link">Read more</a></span>';
            
//             element.innerHTML = html; // Replace the text content with the HTML
            
//             var readMoreLink = element.querySelector('.rew_read-more-link');
            
//             // Add event listener to "Read more" link
//             readMoreLink.addEventListener('click', function(event) {
//                 event.preventDefault(); // Prevent default link behavior
//                 var remainingTextSpan = element.querySelector('.rew_remaining-text');
//                 if (remainingTextSpan.style.display === "none") {
//                     remainingTextSpan.style.display = "inline"; // Show the remaining text
//                 } else {
//                     remainingTextSpan.style.display = "none"; // Hide the remaining text
//                 }
//             });
//         }
//     });