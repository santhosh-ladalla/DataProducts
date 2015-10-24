var downloadIter = 0;
var loadW = screen.width;
var loadH = screen.height;
var wallLoading = false;

function loadWallpaper(wallId, width, height){
    hideAdvDownloadPopup();

    loadW = width;
    loadH = height;

    wallLoading = true;
    beginDownloadAnimation();

    // Get Download URL for Wallpaper (and/or crop if not already)
    $.ajax({
        url: '/get_wallpaper_download_url.php?id=' + wallId + '&w=' + width + '&h=' + height,
        success: function(data){
            if(data.substr(0,4) != 'http') {
                showError('Invalid wallpaper download URL returned: ' + data);
                return;
            }

            $('#wallerror').html("");
            $('#wallpaperCanvas').css('width', loadW);
            $('#wallpaperCanvas').css('height', loadH);

            // Load the wallpaper via the returned URL
            $("#wallpaperCanvas").hide() //Hide it
                .one('load', function() { //Set something to run when it finishes loading
                    $("#wallpaperCanvas").show();
                    endDownloadPB();
                })
                .attr('src', data) //Set the source so it begins fetching
                .each(function() {
                    //Cache fix for browsers that don't trigger .load()
                    if(this.complete) $(this).trigger('load');
                });
        },
        error: function(xhr, ajaxOptions, thrownError) {
            showError('(' + xhr.status + ' : ' + thrownError + ') Could not retrieve wallpaper download URL!');
            endDownloadPB();
        }
    });
}

function showError(msg){
    console.log("Error: " + msg);
    $('#wallerror').html("<h2>An error has occurred: " + msg + "</h2>");
    $("#wallpaperCanvas").hide();
}

function beginDownloadAnimation(){
    downloadIter = 0;

    $('#getloadingdiv').show();

    setTimeout("updateDownloadPB()", 50);
}

function updateDownloadPB(){
    if(wallLoading){
        downloadIter = downloadIter + 1;
        setDownloadPBWidth(480 * (1 - Math.pow(Math.E, -.02 * downloadIter)));
        setTimeout("updateDownloadPB()", 50);
    }
}

function setDownloadPBWidth(width){
    $('#getloadingprogressbar').width(width + "px");
}

function endDownloadPB(){
    setDownloadPBWidth(480);
    wallLoading = false;
    $('#getloadingdiv').hide();
}
function loadHeaderScreenInfo(){
    var ar = screen.width / screen.height;
    var sres = screen.width + "x" + screen.height;
    var det = "";

    if(ar == 4/3 || ar == 1.25)
        det = "Standard";
    else if(sres == "320x480")
        det = "iPhone";
    else if(sres == "480x272")
        det = "PSP";
    else if(sres == "1280x720")
        det = "720p";
    else if(sres == "1920x1080")
        det = "1080p";
    else if(ar >= 1.6)
        det = "Widescreen";
    else
        det = "Unknown";

    document.getElementById('detres').innerHTML = screen.width + "x" + screen.height;
    document.getElementById('detar').innerHTML = det;
}

function showAdvDownloadPopup(wallId, width, height){
    var pop = document.getElementById('advdownloadpopdiv');

    if(pop.innerHTML == ""){
        pop.innerHTML = "<div class=\"bluebox\"><div class=\"blueboxInner\"><strong>Loading...</strong></div></div>";
        getAjaxContent('advdownloadpopdiv', 'advdownloadpop', wallId + '|' + width + '|' + height);
    }

    pop.style.display = "block";
    advdownloadpopup = true;
    return;
}

function hideAdvDownloadPopup(){
    document.getElementById('advdownloadpopdiv').style.display = "none";
    advdownloadpopup = false;
    return;
}
