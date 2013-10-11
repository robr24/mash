 var chimeMix = {
     api_key: 'EF1NV6N2LUD248IMJ',
     base_url: 'http://developer.echonest.com/api/v4/song/'
 }


 var getSongInfo = function (title, artist) {
     var title = encodeURIComponent("Marry Me");
     var artist = encodeURIComponent("The Drive-By Truckers");

     var url = "http://developer.echonest.com/api/v4/song/search?api_key=EF1NV6N2LUD248IMJ&artist=" + artist + "&title=" + title;

     $.ajax(url).done(function (data) {
         console.debug('result: ', data);

         var url = chimeMix.base_url +
             "profile?api_key=" +
             chimeMix.api_key +
             "&id=" +
             data.response.songs[0].id +
             "&bucket=audio_summary";


         $.ajax(url).done(function (data) {
             console.debug('song profile: ', data);
         });
     });
 }
