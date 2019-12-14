var map;

function drawmap() {

    if (!map) {
        map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([9.3649741, 48.6823006]),
                zoom: 15
            })
        });

    }
}
