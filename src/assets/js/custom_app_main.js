var loginFb = function () {
    return new Promise((resolve, reject) => {
        FB.login(function (response) {
            // handle the response
            resolve(true)
        }, {
            scope: 'email,public_profile,pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,business_management'
        });

    })
}

var getfbAccessToken = function () {
    return FB.getAccessToken()
}

var intitFb = function () {
    FB.init({
        appId: 237115430795272,
        //appId:167511295100307,
        xfbml: true,
        cookie: true,
        version: 'v19.0'
    })
}