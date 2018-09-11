var searchForm = document.querySelector(".hotelsearch");
var searchFormButton = document.querySelector(".hotel-search-title");
var modalFormHidden = document.querySelector(".modal-hidden");
var modalFormShow = document.querySelector(".modal-show");
var mapBlock = document.querySelector(".map");

var dateArrival = searchForm.querySelector("#datearrival");
var dateDeparture = searchForm.querySelector("#datedeparture");
var numAdults = searchForm.querySelector("#adults");
var numChildren = searchForm.querySelector("#children");

// хранимые переменные
var savedDateArrival = "";
var savedDateDeparture = "";
var savedNumAdults = "";
var savedNumChildren = "";

// проверяем локальное хранилище 
var isStorageSupported = true;
try {

  savedDateArrival = localStorage.getItem("dateArrival");
  savedDateDeparture = localStorage.getItem("dateDeparture");
  savedNumAdults = localStorage.getItem("numAdults");
  savedNumChildren = localStorage.getItem("numChildren");

} catch (err) {

  isStorageSupported = false;

}


if (!modalFormHidden) {
  
  if (searchForm) {
    searchForm.classList.add("modal-hidden");
  };
 
};

searchFormButton.addEventListener("click", function (evt) {

  evt.preventDefault();  
  searchForm.classList.toggle("modal-hidden");    
  searchForm.classList.add("modal-show");
  mapBlock.classList.toggle("map-back");

  if (!modalFormHidden) {      
    dateArrival.focus();

    //вставляем значения из хранилища, если они там есть
    if (isStorageSupported) {
      if (savedDateArrival) {
        dateArrival.value = savedDateArrival;
        dateDeparture.focus();
      }
      if (savedDateDeparture) {
        dateDeparture.value = savedDateDeparture;
        numAdults.focus();
      }
      if (savedNumAdults) {
        numAdults.value = savedNumAdults;
        numChildren.focus();
      }
      if (savedDateDeparture) {
        numChildren.value = savedNumChildren;
      }
    }
  }
});

searchForm.addEventListener("submit",function(evt){
    var validationErrors = false;
    
    // проверяем заполнение полей, если что маркируем классом validate-error
    if (!dateArrival.value) {     
      dateArrival.classList.add("validate-error");      
      validationErrors = true;
    }

    if (!dateDeparture.value) {     
      dateDeparture.classList.add("validate-error");      
      validationErrors = true;
    }

    if (!numAdults.value) {     
      numAdults.classList.add("validate-error");      
      validationErrors = true;
    }

    if (isStorageSupported) {    
      if (dateArrival.value) {   
        localStorage.setItem("dateArrival", dateArrival.value);
      }
      if (dateDeparture.value) {   
        localStorage.setItem("dateDeparture", dateDeparture.value);
      }
      if (numAdults.value) {   
        localStorage.setItem("numAdults", numAdults.value);
      }
      if (numChildren.value) {   
        localStorage.setItem("numChildren", numChildren.value);
      }
    }

    // если были ошибки, возврат
    if (validationErrors) {
      evt.preventDefault();      
      searchForm.classList.add("modal-error");
      return;
    }   

    // очистка хранилища при удачной отправке данных
    if (isStorageSupported) {
      localStorage.clear();
    }

  }
);



// очистка ошибок валидации
dateArrival.addEventListener("focus",function(){  
    dateArrival.classList.remove("validate-error");   
  }
);

dateDeparture.addEventListener("focus",function(){  
    dateDeparture.classList.remove("validate-error");    
  }
);

numAdults.addEventListener("focus",function(){  
    numAdults.classList.remove("validate-error");    
  }
);

// для отлова событий анимации
var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
    }
}

PrefixedEvent(searchForm, "AnimationEnd", function() {
  searchForm.classList.remove("modal-error");
  searchForm.classList.remove("modal-show");
});


// работа с картой Open Map
var mousePositionControl = new ol.control.MousePosition( {
  // используется градусная проекция
  projection: 'EPSG:4326',
  // переопределяем функцию вывода координат
  coordinateFormat: function(coordinate) {
      // сначала широта, потом долгота и ограничиваем до 4 знаков после запятой
      return ol.coordinate.format(coordinate, '{y}, {x}', 4);
  }
} );

var zoomSliderControl = new ol.control.ZoomSlider ( {
  minResolution: 1000,
  maxResolution: 25000
  }
);

var map = new ol.Map({
    controls: ol.control.defaults().extend([
      zoomSliderControl,
      mousePositionControl,
      new ol.control.OverviewMap(),
      new ol.control.ScaleLine()
  ]),
  target: 'map-sedona'
});

// слой плитки с OpenMap
var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

map.addLayer(osmLayer);

var markerSource = new ol.source.Vector();
var markerStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 38],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'img/elements/red-pin.png'
  }))
});

var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([-111.7765 , 34.8635])),
    name: 'Седона'
});

markerSource.addFeature(iconFeature);

// добавляем маркер
var markerVectorLayer = new ol.layer.Vector({
  source: markerSource,
  style: markerStyle
});
map.addLayer(markerVectorLayer);


var view =  new ol.View({
  center: ol.proj.fromLonLat([-111.7565 , 34.7475]),
  zoom:9,
  minZoom:4,
  maxZoom:16
});

map.setView(view);
