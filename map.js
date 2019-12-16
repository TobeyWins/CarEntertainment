var map;

var position;

var pointCoords = [9.3649741, 48.6823006];
var transformedPointCoords = ol.proj.fromLonLat(pointCoords);
var point = new ol.geom.Point(transformedPointCoords, 'XY');

function fetchPosition() {
  fetch(MAP_BASE_URL).then(function (response) {
      response.text().then(function (text) {
          position = JSON.parse(text);
          console.log(text);
          changepos();
      });
  });
}

function changepos() {
    pointCoords[0] += 0.0001; //= position.lat;
    pointCoords[1] += 0.0001; //= position.long;

    transformedPointCoords = ol.proj.fromLonLat(pointCoords);
    newMapPosition = new ol.geom.Point(transformedPointCoords, 'XY')
    iconFeature.setGeometry(newMapPosition);

    if(map)
    {
      map.getView().setCenter(ol.proj.fromLonLat(pointCoords));
    }
}

var iconFeature = new ol.Feature({
    geometry: point,
    name: 'current position'
  });
  
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: 'images/icons8-farbe-48.png'
    })
  });
  
  iconFeature.setStyle(iconStyle);
  
  var vectorSource = new ol.source.Vector({
    features: [iconFeature]
  });
  
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });


function drawmap() {

    if (!map) {
        map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                vectorLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([9.3649741, 48.6823006]),
                zoom: 15
            })
        });

    }
}
