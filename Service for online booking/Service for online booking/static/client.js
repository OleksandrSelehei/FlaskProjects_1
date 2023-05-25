const result = document.querySelector('.result');

// вивід результатів пошуку
function showSearchHotel(hotel, country, hotelNumber, price, description) {
  //code
  result.innerHTML += `
  <div class="output">
    <div class="output-text">
      <div class="caption">
        Готель:
      </div>
      <div class="info">
        ${hotel}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна:
      </div>
      <div class="info">
        ${country}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Номер готелю:
      </div>
      <div class="info">
        ${hotelNumber}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Ціна:
      </div>
      <div class="info">
        ${price}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Опис:
      </div>
      <div class="info">
        ${description}
      </div>
    </div>
    <form>
       <label for="start-date">Початок:</label>
         <input type="date" id="start-date-booking" name="start-date" class="input-date"><br>

         <label for="end-date">Кінець:</label>
       <input type="date" id="end-date-booking" name="end-date" class="input-date input-date-ml"><br>
     </form>
    <button onclick="buy_hotel()" type="submit" class="btn offer-btn">
      Оформити
    </button>
  </div>
  `
};

function showSearchExcursion(excursion_title, country, date_start, price, place, description) {
  //code
  result.innerHTML += `
  <div class="output">
    <div class="output-text">
      <div class="caption">
        Назва екскурсії:
      </div>
      <div class="info">
        ${excursion_title}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна:
      </div>
      <div class="info">
        ${country}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Дата початку екскурсії:
      </div>
      <div class="info">
        ${date_start}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Ціна:
      </div>
      <div class="info">
        ${price}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Опис:
      </div>
      <div class="info">
        ${description}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Кількість місць:
      </div>
      <div class="info">
        ${place}
      </div>
    </div>

    <button onclick="buy_excursion()" type="submit" class="btn offer-btn">
      Оформити
    </button>
  </div>
  `
};

function showSearchFlight(airline_name, airport_departure, airport_arrival, country_departure, country_arrival, date_departure, time_departure, time_arrival, number_place, price) {
  //code
  result.innerHTML += `
  <div class="output">
    <div class="output-text">
      <div class="caption">
        Авіакомпанія:
      </div>
      <div class="info">
        ${airline_name}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Виліт:
      </div>
      <div class="info">
        ${airport_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Прибуття:
      </div>
      <div class="info">
        ${airport_arrival}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна вильоту:
      </div>
      <div class="info">
        ${country_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна прибуття:
      </div>
      <div class="info">
        ${country_arrival}
      </div>
    </div>

    <div class="output-text">
      <div class="caption">
        Дата вильоту:
      </div>
      <div class="info">
        ${date_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Час вильоту:
      </div>
      <div class="info">
        ${time_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Час прибуття:
      </div>
      <div class="info">
        ${time_arrival}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Місце:
      </div>
      <div class="info">
        ${number_place}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Ціна:
      </div>
      <div class="info">
        ${price}
      </div>
    </div>
    <button onclick="buy_flight()" type="submit" class="btn offer-btn">
      Оформити
    </button>
  </div>
  `
};

// підтвердження купівлі або бронювання

function showCheckExcursion(excursion_title, country, date_start, price, description, date, time) {
  //code
  htmlCode = `
   <h1>
      Ваше замовлення
   </h1>
  <div class="output">
    <link rel="stylesheet" href="/static/style/main.css">
    <div class="output-text">
      <div class="caption">
        Кветанція:
      </div>
      <div class="info">
        квиток на екскурсію
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Назва екскурсії:
      </div>
      <div class="info">
        ${excursion_title}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна:
      </div>
      <div class="info">
        ${country}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Дата початку екскурсії:
      </div>
      <div class="info">
        ${date_start}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Ціна:
      </div>
      <div class="info">
        ${price}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Опис:
      </div>
      <div class="info">
        ${description}
      </div>
    </div>

    <div class="output-text">
      <div class="caption">
        Дата:
      </div>
      <div class="info">
        ${date}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Час:
      </div>
      <div class="info">
        ${time}
      </div>
    </div>
  </div>
  `
  const newTab = window.open();
  newTab.document.write(htmlCode);
  newTab.document.close();
};

function showCheckFlight(airline_name, airport_departure, airport_arrival, country_departure, country_arrival, date_departure, time_departure, time_arrival, number_place, price, date, time) {
  //code
   htmlCode = `
  <div class="output">
    <link rel="stylesheet" href="/static/style/main.css">
    <div class="output-text">
      <div class="caption">
        Кветанція:
      </div>
      <div class="info">
        квиток на авіарейс

    </div>
    <div class="output-text">
      <div class="caption">
        Авіакомпанія:
      </div>
      <div class="info">
        ${airline_name}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Виліт:
      </div>
      <div class="info">
        ${airport_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Прибуття:
      </div>
      <div class="info">
        ${airport_arrival}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна вильоту:
      </div>
      <div class="info">
        ${country_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна прибуття:
      </div>
      <div class="info">
        ${country_arrival}
      </div>
    </div>

    <div class="output-text">
      <div class="caption">
        Дата вильоту:
      </div>
      <div class="info">
        ${date_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Час вильоту:
      </div>
      <div class="info">
        ${time_departure}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Час прибуття:
      </div>
      <div class="info">
        ${time_arrival}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Місце:
      </div>
      <div class="info">
        ${number_place}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Ціна:
      </div>
      <div class="info">
        ${price}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
         Дата::
      </div>
      <div class="info">
        ${date}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Час:
      </div>
      <div class="info">
        ${time}
      </div>
    </div>
  </div>
  `
  const newTab = window.open();
  newTab.document.write(htmlCode);
  newTab.document.close();
};

function showCheckHotel(hotel, country, hotelNumber, price, description, date_start, date_end, date, time) {
  //code
  htmlCode = `
   <h1>
      Ваше замовлення
   </h1>
  <div class="output">
    <link rel="stylesheet" href="/static/style/main.css">
    <div class="output-text">
      <div class="caption">
        Кветанція:
      </div>
      <div class="info">
        про бронювання готеля
    </div>
    <div class="output-text">
      <div class="caption">
        Готель:
      </div>
      <div class="info">
        ${hotel}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Країна:
      </div>
      <div class="info">
        ${country}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Номер готелю:
      </div>
      <div class="info">
        ${hotelNumber}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Ціна:
      </div>
      <div class="info">
        ${price}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Опис:
      </div>
      <div class="info">
        ${description}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        На термін:
      </div>
      <div class="info">
       З: ${date_start} по: ${date_end}
      </div>
    </div>

    <div class="output-text">
      <div class="caption">
        Дата:
      </div>
      <div class="info">
        ${date}
      </div>
    </div>
    <div class="output-text">
      <div class="caption">
        Час:
      </div>
      <div class="info">
        ${time}
      </div>
    </div>
  `
  const newTab = window.open();
  newTab.document.write(htmlCode);
  newTab.document.close();
};

//вивод даних при загрузці сторінки
function all_search_hotel(){
      //відправка данних
      $.post("/hotels", {BOOL: "SEARCH_ALL"}, function(response) {
        response = response.reverse();
        for (let i = 0; i < response.length; i++) {
            if (typeof response[i] === 'string'){
                container.innerHTML = response[i];
            }else{
               showSearchHotel(response[i][0], response[i][1], response[i][2], response[i][3], response[i][4]);
            }
         }
      });
}

//вивод даних при загрузці сторінки
function all_search_flight(){
      $.post("/flight", {BOOL: "SEARCH_ALL"}, function(response) {
          response = response.reverse();
          for (let i = 0; i < response.length; i++) {
            if (typeof response[i] === 'string'){
                container.innerHTML = response[i];
            }else{
               showSearchFlight(response[i][0], response[i][1], response[i][2], response[i][3], response[i][4], response[i][5], response[i][6], response[i][7], response[i][8], response[i][9]);
            }
         }
      });
}

//вивод даних при загрузці сторінки
function all_search_excursion(){
      $.post("/excursion", {BOOL: "SEARCH_ALL"}, function(response) {
         response = response.reverse();
         for (let i = 0; i < response.length; i++) {
            if (typeof response[i] === 'string'){
                container.innerHTML = response[i];
            }else{
               showSearchExcursion(response[i][0], response[i][1], response[i][2], response[i][3], response[i][4], response[i][5]);
            }
         }
      });
}

//пошук потрібних екскурсій по параметрах
function search_excursion(){
  //отримання данних від клієнта
  const inputTextLocation = document.getElementById('location').value;
  const inputTextDate = document.getElementById('start-date').value;
    $.post("/excursion", {BOOL: "SEARCH", inputTextLocation: inputTextLocation, inputTextDate: inputTextDate}, function(response) {
         response = response.reverse();
         result.innerHTML = '';
         for (let i = 0; i < response.length; i++) {
            if (typeof response[i] === 'string'){
                container.innerHTML = response[i];
            }else{
               showSearchExcursion(response[i][0], response[i][1], response[i][2], response[i][3], response[i][4], response[i][5]);
            }
         }
        });
  }

//пошук авіаквитків
function search_flight(){
  const inputTextAirCompany = document.getElementById('air_company').value;
  const inputTextCountryDeparting = document.getElementById('country_departing').value;
  const inputTextCountryArrives = document.getElementById('country_arrives').value;
  const inputTextDate = document.getElementById('start-date').value;
  const inputTextTime = document.getElementById('departure-time').value;
  $.post("/flight", {BOOL: "SEARCH", inputTextAirCompany: inputTextAirCompany, inputTextCountryDeparting: inputTextCountryDeparting, inputTextCountryArrives: inputTextCountryArrives, inputTextDate: inputTextDate, inputTextTime: inputTextTime}, function(response) {
          response = response.reverse();
          result.innerHTML = '';
          for (let i = 0; i < response.length; i++) {
            if (typeof response[i] === 'string'){
                container.innerHTML = response[i];
            }else{
               showSearchFlight(response[i][0], response[i][1], response[i][2], response[i][3], response[i][4], response[i][5], response[i][6], response[i][7], response[i][8], response[i][9]);
            }
         }
      });
}

//пошук готелів
function search_hotel(){
  const inputTextLocation = document.getElementById('location').value;
  const inputTextDateStart = document.getElementById('start-date').value;
  const inputTextDataEnd = document.getElementById('end-date').value;
  $.post("/hotels", {BOOL: "SEARCH", inputTextLocation: inputTextLocation, inputTextDateStart: inputTextDateStart, inputTextDataEnd: inputTextDataEnd}, function(response) {
         response = response.reverse();
         result.innerHTML = '';
         for (let i = 0; i < response.length; i++) {
            if (typeof response[i] === 'string'){
                container.innerHTML = response[i];
            }else{
               showSearchHotel(response[i][0], response[i][1], response[i][2], response[i][3], response[i][4]);
            }
         }
      });
}
//покупка авіаквитків
function buy_flight(){
    const card = event.currentTarget.closest('.output');
    const inputTextAirCompany = card.querySelector('.output-text:nth-child(1) .info').textContent.trim();
    const inputTextCountryDeparting = card.querySelector('.output-text:nth-child(4) .info').textContent.trim();
    const inputTextCountryArrives = card.querySelector('.output-text:nth-child(5) .info').textContent.trim();
    const inputTextDate = card.querySelector('.output-text:nth-child(6) .info').textContent.trim();
    const inputTextTime = card.querySelector('.output-text:nth-child(7) .info').textContent.trim();
    const SeatNumber = card.querySelector('.output-text:nth-child(9) .info').textContent.trim();
   //відправка данних на сервер
   $.post("/flight", {BOOL: "BUY", inputTextAirCompany: inputTextAirCompany, inputTextCountryDeparting: inputTextCountryDeparting, inputTextCountryArrives: inputTextCountryArrives, inputTextDate: inputTextDate, inputTextTime: inputTextTime, SeatNumber: SeatNumber}, function(response) {
      if (typeof response === 'string'){
        result.innerHTML = `<div class='output'>Виникла помилки: ${response}</div>`;
      }else{
        const DATA = response.flat();
        showCheckFlight(DATA[0], DATA[1], DATA[2], DATA[3], DATA[4], DATA[5], DATA[6], DATA[7], DATA[8], DATA[9], DATA[10], DATA[11])
        location.reload();
      }
   });
}

//покупка квитків на екскурсію
function buy_excursion(){
    const card = event.currentTarget.closest('.output');
    const NameExcursion = card.querySelector('.output-text:nth-child(1) .info').textContent.trim();
    const Country = card.querySelector('.output-text:nth-child(2) .info').textContent.trim();
    const DateStart = card.querySelector('.output-text:nth-child(3) .info').textContent.trim();
   //відправка данних на сервер
   $.post("/excursion", {BOOL: "BUY", NameExcursion: NameExcursion, Country: Country, DateStart: DateStart}, function(response) {
        if (typeof response === 'string'){
            result.innerHTML = `<div class='output'>Виникла помилки: ${response}</div>`;
        }else{
            const DATA = response.flat();
            showCheckExcursion(DATA[0], DATA[1], DATA[2], DATA[3], DATA[5], DATA[6], DATA[7]);
            location.reload();
        }
   });
}

//оренда номерів
function buy_hotel(){
      const card = event.currentTarget.closest('.output');
      const NameHotel = card.querySelector('.output-text:nth-child(1) .info').textContent.trim();
      const Country = card.querySelector('.output-text:nth-child(2) .info').textContent.trim();
      const DateStart = card.querySelector('#start-date-booking').value;
      const DateEnd = card.querySelector('#end-date-booking').value;
      const Number = card.querySelector('.output-text:nth-child(3) .info').textContent.trim();
   //відправка данних на сервер
   $.post("/hotels", {BOOL: "BUY", NameHotel: NameHotel, Country: Country, DateStart: DateStart, DateEnd: DateEnd, Number: Number}, function(response) {
       if (typeof response === 'string'){
            result.innerHTML = `<div class='output'>Виникла помилки: ${response}</div>`;
       }else{
          const DATA = response.flat();
          if(DATA.length === 3){
            result.innerHTML = `<div class='output'>Виникла помилки: ${DATA[0]}</div>`;
          }else{
                showCheckHotel(DATA[0], DATA[1], DATA[2], DATA[3], DATA[4], DateStart, DateEnd, DATA[6], DATA[7])
                location.reload();
          }
       }
    });
}