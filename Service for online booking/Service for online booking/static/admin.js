const admin = document.querySelector('.admin');

// функція для перевірки логіну та поролю та вход в адмінку
function submit() {
  //ввод данних
  const inputTextLogin = document.getElementById('login').value;
  const inputTextPassword = document.getElementById('password').value;
  //відправка данних на сервер
  $.post("/admin", {inputTextLogin: inputTextLogin, inputTextPassword: inputTextPassword}, function(response) {
            admin.innerHTML = '';
            //перевірка результатау
            if(response === "admin/hotels"){
                window.location.href = response;
            }else{
                admin.innerHTML = response;
            }
        });
  }

//додовання готелів до бази данних
function button_add_hotel() {
  //отримання данних від користувача
  const inputTextName = document.getElementById('name').value;
  const inputTextLocation = document.getElementById('location').value;
  const inputTextDescription = document.getElementById('description').value;
  const inputTextHotelNumber = document.getElementById('hotel_number').value;
  const inputTextPrice = document.getElementById('price').value;
  //відправка данних на сервер
  $.post("/admin/hotels", {inputTextName: inputTextName, inputTextLocation: inputTextLocation, inputTextDescription: inputTextDescription, inputTextHotelNumber: inputTextHotelNumber, inputTextPrice: inputTextPrice}, function(response) {
            admin.innerHTML = '';
            //перевірка отриманого результату від сервера
            if(response === "True"){
                location.reload()
            }else{
                admin.innerHTML = response;
            }
        });
  }

//додавання екскурсій
function button_add_excursion() {
  //отримання даних від користувача
  const inputTextName = document.getElementById('name').value;
  const inputTextLocation = document.getElementById('location').value;
  const inputTextDescription = document.getElementById('description').value;
  const inputTextPlaces = document.getElementById('places').value;
  const inputTextDate = document.getElementById('start-date').value;
  const inputTextPrice = document.getElementById('price').value;
  //відправка данних на сервер
  $.post("/admin/excursion", {inputTextName: inputTextName, inputTextLocation: inputTextLocation, inputTextDescription: inputTextDescription, inputTextPlaces: inputTextPlaces, inputTextDate: inputTextDate, inputTextPrice: inputTextPrice}, function(response) {
            admin.innerHTML = '';
            //перевірка результатів
            if(response === "True"){
                location.reload()
            }else{
                admin.innerHTML = response;
            }
        });
  }

//додавання авіаквитків
function button_add_flight() {
  //отримання данних
  const inputTextAirCompany = document.getElementById('air_company').value;
  const inputTextAirportDeparting = document.getElementById('airport_departing').value;
  const inputTextAirportArrives = document.getElementById('airport_arrives').value;
  const inputTextCountryDeparting = document.getElementById('country_departing').value;
  const inputTextCountryArrives = document.getElementById('country_arrives').value;
  const inputTextSeatNumber = document.getElementById('seat_number').value;
  const inputTextDate = document.getElementById('start-date').value;
  const inputTextDepartureTime = document.getElementById('departure-time').value;
  const inputTextArrivalTime = document.getElementById('arrival-time').value;
  const inputTextPrice = document.getElementById('price').value;
  //відправка данних
  $.post("/admin/flight", {inputTextAirCompany: inputTextAirCompany, inputTextAirportDeparting: inputTextAirportDeparting, inputTextAirportArrives: inputTextAirportArrives, inputTextCountryDeparting: inputTextCountryDeparting, inputTextCountryArrives: inputTextCountryArrives, inputTextSeatNumber: inputTextSeatNumber, inputTextDate: inputTextDate, inputTextDepartureTime: inputTextDepartureTime, inputTextArrivalTime: inputTextArrivalTime, inputTextPrice: inputTextPrice}, function(response) {
            admin.innerHTML = '';
            //перевірка результатау
            if(response === "True"){
                location.reload()
            }else{
                admin.innerHTML = response;
            }
        });
  }
