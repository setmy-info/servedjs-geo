## ServedJS GEO

    $geo

    var geoWatcher = $geo.newWatcher(function (position) {console.log("Position: ", position);});
    geoWatcher.start();
    geoWatcher.stop();
