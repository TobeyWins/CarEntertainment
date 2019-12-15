var map;

var pointCoords = [9.3649741, 48.6823006];
var transformedPointCoords = ol.proj.fromLonLat(pointCoords);
var point = new ol.geom.Point(transformedPointCoords, 'XY');

function changepos() {
    pointCoords[0]++;
    pointCoords[1]++;

    transformedPointCoords = ol.proj.fromLonLat(pointCoords);
    iconFeature.setGeometry( new ol.geom.Point(transformedPointCoords, 'XY'));

    //var coordinate = iconFeature.getGeometry().translate(10,10);
    //var coordinate = feature.getGeometry().getCoordinates();
    //move coordinates some distance
    //ol.coordinate.add(coordinate, 10, 10);
    //use setGeometry to move it   
    //iconFeature.setGeometry(point);
}

var iconFeature = new ol.Feature({
    geometry: point,
    name: 'current position'
  });
  
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      //anchor: [0.5, 0.5],
      //anchorXUnits: 'fraction',
      //anchorYUnits: 'pixels',
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

/*
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
*/
/*
var rasterLayer = new TileLayer({
  source: new TileJSON({
    url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json',
    crossOrigin: ''
  })
});

var map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    center: [0, 0],
    zoom: 3
  })
});

*/