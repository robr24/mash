 var getLocation = function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showWeather);
                } else {
                    x.innerHTML = "Geolocation is required for this app to work.";
                }
            }

            var chimeUser = {

                userLocation: '',

                wxicon: '',

                desc: '',

                temp: '',

                iconSrc: 'https://profile.weather.com/img/wxicons/52/',

                iconType: '.png'

            }

            var mapProfileToPlaylist = function(profile) {
                var playlist = [],
                    counter = 0;
                $(chimeSongs).each(function(idx, item) {
                    if (counter > 11) { return; }
                    var title = item.title.toLowerCase();
                    if (item.tempo >= profile.tempo[0] 
                        && item.tempo <= profile.tempo[1]
                        && item.valence >= profile.valence[0] 
                        && item.valence <= profile.valence[1]
                        && item.energy >= profile.energy[0] 
                        && item.energy <= profile.energy[1]
                        && item.danceability >= profile.danceability[0] 
                        && item.danceability <= profile.danceability[1])
                    {
                        
                        playlist.push(item);
                        counter++;
                    }
                    else {
                        // if (title.match('sun')) {
                        //     playlist.push(item);
                        // }
                        var runit = false;
                        if (counter > 11) { return; }
                        $(profile.keywords).each(function(idx, keywrd) {
                            if (runit) { return; }
                            if(title.match(keywrd.toLowerCase())) {
                                runit = true;
                                playlist.push(item);
                                counter++;
                                return;
                            }
                        });
                    }
                });

                playlist = _.uniq(playlist);
                playlist = shuffle(playlist);
                return playlist;

            }

            function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


            var mapClimateToProfile = function() {
                var songProfile = '';

                $(chimeMappingProfiles).each(function(idx, item) {
                   if (item.iconCode == 
                    //'31') {
                    //'37') {
                    chimeUser.wxicon) {
                        songProfile = item;
                        return; 
                   }
                });

                return songProfile;

            }

            var popPlaylist = function (playlist) {
    
                $(playlist).each(function(idx, item) {
                    chimePlaylist.add({
                        title: item.title,
                        artist: item.artist_name,
                        mp3: 'mp3/' + item.selector
                    });
                });
            }

            var updateWeatherDetails = function() {
                var imgUrl = [chimeUser.iconSrc, chimeUser.wxicon, chimeUser.iconType].join('');
                $('.forecast-city').html(chimeUser.userLocation);
                $('.forecast-details-wxicon').css({
                    backgroundImage: 'url(' + imgUrl + ')'
                });
                $('.content-obs-temp').html(chimeUser.temp + '&deg;');
                $('.content-obs-phrase').html(chimeUser.desc);

            }


            var showWeather = function(position) {
                //var url = [ 'http://api.wunderground.com/api/5f12c0c5ef78f0dc/geolookup/conditions/q/', position.coords.latitude, ',', position.coords.longitude, '.json'].join('');


                var url = ["http://dsx-dev.weather.com/wxd/{MORecord;loc}/",

                    position.coords.latitude.toFixed(2),
                        ',',
                        position.coords.longitude.toFixed(2)

                ].join('');


                var updateChimeUser = function(data) {

                    var icon = data.body[0].doc.MOData.sky;

                    var userLocation = data.body[1].doc.prsntNm;

                    var desc = data.body[0].doc.MOData.wx;

                    var temp = data.body[0].doc.MOData.tmpF;



                    chimeUser.wxicon = icon;

                    chimeUser.userLocation = userLocation;

                    chimeUser.desc = desc;

                    chimeUser.temp = temp;

                    updateWeatherDetails();

                    // alert('geolocarted');

                    // $('#chimeUserInfo').html('chimeUser: ' + JSON.stringify(chimeUser));

                    var songProfile = mapClimateToProfile();
                    var playlist = mapProfileToPlaylist(songProfile);
                    popPlaylist(playlist);



                }


                $.ajax(url, {
                    type: 'GET',
                    dataType: "jsonp",
                    jsonp: 'jsonp',
                    success: function(responseData, textStatus, jqXHR) {

                        updateChimeUser(responseData);

                        // console.debug('reposnce: ', responseData);
                    },
                    //                        url: "http://dsx-dev.weather.com/wxd/%7BMORecord;loc%7D33.89,-84.46",

                    error: function(responseData, textStatus, errorThrown) {
                        // alert('POST failed.');
                    }
                });
            }