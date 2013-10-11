var $ = function(e) {
    return document.getElementById(e);
};

function loadUrl(url, callback, reader) {
    var startDate = new Date().getTime();
    ID3.loadTags(url, function() {
        var endDate = new Date().getTime();
        if (typeof console !== "undefined") console.log("Time: " + ((endDate - startDate) / 1000) + "s");
        var tags = ID3.getAllTags(url);

        $("artist").innerHTML = tags.artist || "";
        $("title").innerHTML = tags.title || "";
        $("album").innerHTML = tags.album || "";
        $("artist").innerHTML = tags.artist || "";
        $("year").innerHTML = tags.year || "";
        $("comment").innerHTML = (tags.comment || {}).text || "";
        $("genre").innerHTML = tags.genre || "";
        $("track").innerHTML = tags.track || "";
        $("lyrics").innerHTML = (tags.lyrics || {}).lyrics || "";
        //console.log(Base64.encodeBytes(tags.picture.data.slice(0, 10)));
        //console.log(tags.picture.data.slice(0, 10));
        if ("picture" in tags) {
            var image = tags.picture;
            $("art").src = "data:" + image.format + ";base64," + Base64.encodeBytes(image.data);
            $("art").style.display = "block";
        } else {
            $("art").style.display = "none";
        }
        if (callback) {
            callback();
        };
    }, {
        tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
        dataReader: reader
    });
}

function loadFromLink(link) {
    var loading = link.parentNode.getElementsByTagName("img")[0];
    var url = link.href;

    loading.style.display = "inline";
    loadUrl(url, function() {
        loading.style.display = "none";
    });
}

function loadFromFile(file) {
    var url = file.urn || file.name;
    loadUrl(url, null, FileAPIReader(file));
}

function load(elem) {
    if (elem.id === "file") {
        loadFromFile(elem.files[0]);
    } else {
        loadFromLink(elem);
    }
}