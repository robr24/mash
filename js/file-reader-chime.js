var chimeMix = {
    api_key: 'EF1NV6N2LUD248IMJ',
    base_url: 'http://developer.echonest.com/api/v4/song/',
    base_uri: 'mp3/',
    songs: [],
    chimePlaylist: [],
    
    initialize: function() {
        
        this.chimePlaylist = new jPlayerPlaylist({

            jPlayer: "#chimePlayer",
            cssSelectorAncestor: "#chimeContainer"

    }, [


    ],

    {
        playlistOptions: {
            enableRemoveControls: true,
            autoPlay: true
        },
        /*
                      swfPath: "/js",
                      supplied: "ogv, m4v, oga, mp3",
                      */
        supplied: 'mp3',
        smoothPlayBar: true,
        keyEnabled: true,
        audioFullScreen: true // Allows the audio poster to go full screen via keyboard


    });

        
    }
}

chimeMix.initialize();

    function loadUrl(url, callback, reader) {
        var startDate = new Date().getTime();
        ID3.loadTags(url, function () {
            var endDate = new Date().getTime();
            if (typeof console !== "undefined") console.log("Time: " + ((endDate - startDate) / 1000) + "s");
            var tags = ID3.getAllTags(url);

            //        $("artist").innerHTML = tags.artist || "";
            //        $("title").innerHTML = tags.title || "";
            //        $("album").innerHTML = tags.album || "";
            //        $("artist").innerHTML = tags.artist || "";
            //        $("year").innerHTML = tags.year || "";
            //        $("comment").innerHTML = (tags.comment || {}).text || "";
            //        $("genre").innerHTML = tags.genre || "";
            //        $("track").innerHTML = tags.track || "";
            //        $("lyrics").innerHTML = (tags.lyrics || {}).lyrics || "";
            //console.log(Base64.encodeBytes(tags.picture.data.slice(0, 10)));
            //console.log(tags.picture.data.slice(0, 10));
            //        if ("picture" in tags) {
            //            var image = tags.picture;
            //            $("art").src = "data:" + image.format + ";base64," + Base64.encodeBytes(image.data);
            //            $("art").style.display = "block";
            //        } else {
            //            $("art").style.display = "none";
            //        }
            if (callback) {
                callback();
            };
        }, {
            tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
            dataReader: reader
        });
    }

    function parseSongId3(url, callback, reader) {
        var startDate = new Date().getTime();

        ID3.loadTags(url, function () {
            var endDate = new Date().getTime();
            if (typeof console !== "undefined") console.log("Time: " + ((endDate - startDate) / 1000) + "s");
            var tags = ID3.getAllTags(url);



            //        $("artist").innerHTML = tags.artist || "";
            //        $("title").innerHTML = tags.title || "";
            //        $("album").innerHTML = tags.album || "";
            //        $("artist").innerHTML = tags.artist || "";
            //        $("year").innerHTML = tags.year || "";
            //        $("comment").innerHTML = (tags.comment || {}).text || "";
            //        $("genre").innerHTML = tags.genre || "";
            //        $("track").innerHTML = tags.track || "";
            //        $("lyrics").innerHTML = (tags.lyrics || {}).lyrics || "";
            //console.log(Base64.encodeBytes(tags.picture.data.slice(0, 10)));
            //console.log(tags.picture.data.slice(0, 10));
            //        if ("picture" in tags) {
            //            var image = tags.picture;
            //            $("art").src = "data:" + image.format + ";base64," + Base64.encodeBytes(image.data);
            //            $("art").style.display = "block";
            //        } else {
            //            $("art").style.display = "none";
            //        }
            if (callback) {
                callback(tags, url);
            };
        }, {
            tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
            dataReader: reader
        });
    }

    //
    //function loadFromLink(link) {
    //    var loading = link.parentNode.getElementsByTagName("img")[0];
    //    var url = link.href;
    //
    //    loading.style.display = "inline";
    //    loadUrl(url, function() {
    //        loading.style.display = "none";
    //    });
    //}
    //
    //function loadFromFile(file) {
    //    var url = file.urn || file.name;
    //    loadUrl(url, null, FileAPIReader(file));
    //}

    function extendSongDetails(data, file) {
        var newFile = $(file).extend(data);
        //console.debug('extend ', newFile); 
        getSongEchoInfo(newFile);
    }

    function loadSongFromFile(file) {
        var url = file.urn || file.name;
        parseSongId3(url, extendSongDetails, FileAPIReader(file));

    }

    function handleFileSelect(obj) {
        //var files = e.target.files; 
        if (!obj.files || !obj.files.length > 0) {
            return;
        }

        $.each(obj.files, function (idx, item) {
            loadSongFromFile(item);
        });

    }

var flattenObject = function (ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

var popPlaylist = function (song) {
    
    chimeMix.chimePlaylist.add({
        title: song.title,
        artist: song.artist_name,
        mp3: chimeMix.base_uri + song.selector
    });

}

var extendSongPersonality = function (song, data) {
    var songPersonality = data.response.songs[0];

    var newSong = $(song).extend(songPersonality);
    //newSong = flattenObject(newSong);
    chimeMix.songs.push(newSong);

    console.debug('chime mix: ', newSong);
    popPlaylist(newSong);
}

var getSongEchoInfo = function (song) {
    var title = encodeURIComponent(song.title);
    var artist = encodeURIComponent(song.artist);

    var url = "http://developer.echonest.com/api/v4/song/search?api_key=EF1NV6N2LUD248IMJ&artist=" + artist + "&title=" + title;

    $.ajax(url).done(function (data) {
        //         console.debug('result: ', data);
        if (data.response.songs.length === 0) {
            return;
        }
        var url = chimeMix.base_url +
            "profile?api_key=" +
            chimeMix.api_key +
            "&id=" +
            data.response.songs[0].id +
            "&bucket=audio_summary";


        $.ajax(url).done(function (data) {
            extendSongPersonality(song, data);
            //console.debug('song profile: ', data, song);

        });
    });
}

//function load(elem) {
//    if (elem.id === "file") {
//        loadFromFile(elem.files[0]);
//    } else {
//        loadFromLink(elem);
//    }
//}