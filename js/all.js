

					// initialize the slider menus

					// initialize the slider menus
					$('#global-menu').sidr({
						name: 'sidr-left',
						side: 'left', // By default
						source: '#sidr-menu-source'
					});



//					$('#global-menu').sidr({
//						name: 'sidr-left',
//						side: 'left', // By default
//						source: '#sidr-menu-source'
//					}).on('click', function(e) {
//						sidrCloseListener('sidr-left');
//					});
//					$('#user-profile-link').sidr({
//						name: 'sidr-right',
//						side: 'right',
//						source: TWC.pco.get("profile.userid") ? '#ugc-mobile-user-loggedin' : '#ugc-mobile-user-loggedout'
//					}).on('click', function(e) {
//						sidrCloseListener('sidr-right');
//					});




moment.lang('en', {
    meridiem : function (hour, isLowercase) {
        if (hour < 12) {
            return "a";
        } else {
            return "p";
        }
    }
});

$(document).ready(function update_time(){
var now = moment().format("h:MM A");
    $(".digits").text(now)
    setTimeout(update_time, 1000);
});