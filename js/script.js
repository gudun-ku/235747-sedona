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
  searchForm.classList.toggle("modal-show");
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

    if (!numChildren.value) {     
      numChildren.classList.add("validate-error");      
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

numAdults.addEventListener("focus",function(){  
  numAdults.classList.remove("validate-error");
}
);


