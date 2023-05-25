from flask import Flask, render_template, request
import datetime
import administrator_application_logic
import client_application_logic

app = Flask(__name__)


# Функція яка визиває функції які будуть працювати на вказаних юрл адресах а саме при виборі готелів
@app.route('/', methods=['GET', 'POST'])
@app.route('/hotels', methods=['GET', 'POST'])
def index():
    # перевірка сервера чи є запити у сервера чи просто сервер повинен відправляти штмл шаблон
    if request.method == 'POST':
        # перевірка при запитті які саме дії та данні потрібні від сервера
        if request.form['BOOL'] == 'SEARCH':
            # отримання данних від клієнту
            location = request.form['inputTextLocation']
            data_start = request.form['inputTextDateStart']
            data_end = request.form['inputTextDataEnd']
            # виклик функції пошук готелів та повернення результатау
            return client_application_logic.search_hotel(str(location), str(data_start), str(data_end))
        # запит який відбувається при завантаженні сторінки
        elif request.form['BOOL'] == 'SEARCH_ALL':
            # визов функції яка повертає всі данні з бази данних
            return client_application_logic.all_search_hotel()
        # запит на покупку або бронювання якигось єлементів
        else:
            try:
                name_hotel = request.form['NameHotel']
                country = request.form['Country']
                date_start = request.form['DateStart']
                date_end = request.form['DateEnd']
                number = request.form['Number']
                # функція покупки номерів готелів та повернення данних для чеку
                result = client_application_logic.buy_hotel_number(str(name_hotel), str(country), str(date_start), str(date_end),
                                                                   int(number))
                # повернення данних з датами
                return result + [[datetime.datetime.now().date().strftime("%Y-%m-%d")], [datetime.datetime.now().time().strftime("%H:%M")]]
            except:
                return 'Помилка повторіть пізніше'
    # якщо сервер не отримує запити в данний час
    else:
        # рендерінг штмл сторінки
        return render_template('index.html')


# вибір авіаквитків
@app.route('/flight', methods=['GET', 'POST'])
def flight():
    # при запитті
    if request.method == 'POST':
        # перевірка що саме визиває клієнт
        if request.form['BOOL'] == 'SEARCH':
            # отримання данних
            air_company = request.form['inputTextAirCompany']
            country_departing = request.form['inputTextCountryDeparting']
            country_arrives = request.form['inputTextCountryArrives']
            departure_date = request.form['inputTextDate']
            departure_time = request.form['inputTextTime']
            # визов функції
            return client_application_logic.search_flight(str(air_company), str(country_departing),
                                                          str(country_arrives), str(departure_date),
                                                          str(departure_time))
        # при завантаженні сторінки
        elif request.form['BOOL'] == 'SEARCH_ALL':
            # визов фугкції
            return client_application_logic.all_search_flight()
        # запит на покупку або бронювання якигось єлементів
        else:
            # отримання данних
            air_company = request.form['inputTextAirCompany']
            country_departing = request.form['inputTextCountryDeparting']
            country_arrives = request.form['inputTextCountryArrives']
            departure_date = request.form['inputTextDate']
            departure_time = request.form['inputTextTime']
            seat_number = request.form['SeatNumber']
            try:
                # визов функції
                result = client_application_logic.buy_flight(str(air_company), str(country_departing),
                                                             str(country_arrives), str(departure_date),
                                                             str(departure_time), int(seat_number))
                # повернення данних для чеку
                return result + [[datetime.datetime.now().date().strftime("%Y-%m-%d")], [datetime.datetime.now().time().strftime("%H:%M")]]
            except:
                return 'Помилка повторіть пізніше'
    # коли сервер не отримує запитів
    else:
        return render_template('flight.html')


# вибір екскурсій
@app.route('/excursion', methods=['GET', 'POST'])
def excursion():
    # при запитті
    if request.method == 'POST':
        # перевірка що саме визиває клієнт
        if request.form['BOOL'] == 'SEARCH':
            # отримання данних
            location = request.form['inputTextLocation']
            date = request.form['inputTextDate']
            # визов функції та повернення результату
            return client_application_logic.search_excursion(str(location), str(date))
        # при завантаженні сторінки
        elif request.form['BOOL'] == 'SEARCH_ALL':
            # визов фугкції
            return client_application_logic.all_search_excursion()
        # запит на покупку або бронювання якигось єлементів
        else:
            # отримання данних
            name_excursion = request.form['NameExcursion']
            country = request.form['Country']
            date_start = request.form['DateStart']
            try:
                # визов функції
                result = client_application_logic.buy_excursion(str(name_excursion), str(country), str(date_start))
                # повернення данних для чеку
                return result + [[datetime.datetime.now().date().strftime("%Y-%m-%d")], [datetime.datetime.now().time().strftime("%H:%M")]]
            except:
                return 'Помилка повторіть пізніше'
    # коли сервер не отримує запитів
    else:
        return render_template('excursion.html')


# вхід в адмін частину
@app.route('/admin', methods=['GET', 'POST'])
def admin():
    # при запитті
    if request.method == 'POST':
        # отримання данних від клієнтів
        text_login = request.form['inputTextLogin']
        text_password = request.form['inputTextPassword']
        # функція для перевірки паролю та логіну
        return administrator_application_logic.administrative_users_authorization(text_login, text_password)
    # коли сервер не отримує запитів
    else:
        return render_template('admin.html')


# додовання готелів
@app.route('/admin/hotels', methods=['GET', 'POST'])
def admin_hotels():
    # при запитті
    if request.method == 'POST':
        # отримання данних
        name = request.form['inputTextName']
        location = request.form['inputTextLocation']
        description = request.form['inputTextDescription']
        hotel_number = request.form['inputTextHotelNumber']
        price = request.form['inputTextPrice']
        try:
            # функція для додавання данних в базу данних
            administrator_application_logic.add_hotel(str(name), str(location), str(description), int(hotel_number),
                                                      float(price))
            # повернення результату для оновлення сторінки
            return 'True'
        # вивід помилки
        except:
            return 'При додаванні готелю відбулась помилка.'
    # коли сервер не отримує запитів
    else:
        return render_template('admin_hotels.html')


# додавання авіаквитків
@app.route('/admin/flight', methods=['GET', 'POST'])
def admin_flight():
    # при запитті
    if request.method == 'POST':
        # додавання данних
        air_company = request.form['inputTextAirCompany']
        airport_departing = request.form['inputTextAirportDeparting']
        airport_arrives = request.form['inputTextAirportArrives']
        country_departing = request.form['inputTextCountryDeparting']
        country_arrives = request.form['inputTextCountryArrives']
        seat_number = request.form['inputTextSeatNumber']
        start_date = request.form['inputTextDate']
        departure_time = request.form['inputTextDepartureTime']
        arrival_time = request.form['inputTextArrivalTime']
        price = request.form['inputTextPrice']
        try:
            # функція для додавання авіяквитків
            administrator_application_logic.add_flight(str(air_company), str(airport_departing), str(airport_arrives),
                                                       str(country_departing), str(start_date), str(departure_time),
                                                       str(arrival_time), int(seat_number), float(price),
                                                       str(country_arrives))
            # повернення результату для оновлення сторінки
            return 'True'
        # вивід помилки
        except:
            return 'При додаванні авіаквитків відбулась помилка.'
    # коли сервер не отримує запитів
    else:
        return render_template('admin_flight.html')


# додовання екскурсій
@app.route('/admin/excursion', methods=['GET', 'POST'])
def admin_excursion():
    # при запитті
    if request.method == 'POST':
        # отримання данних
        name = request.form['inputTextName']
        location = request.form['inputTextLocation']
        description = request.form['inputTextDescription']
        places = request.form['inputTextPlaces']
        date = request.form['inputTextDate']
        price = request.form['inputTextPrice']
        try:
            # визов функції для додовання квитків на екскурсії в базуданниих
            administrator_application_logic.add_excursion(str(name), str(location), str(date), float(price),
                                                          int(places), str(description))
            # повернення результату для оновлення сторінки
            return 'True'
        # вивід помилки
        except:
            return 'При додаванні єкскурсії відбулась помилка.'
    # коли сервер не отримує запитів
    else:
        return render_template('admin_excursion.html')


if __name__ == '__main__':
    # запуск серверу та вієї программи
    app.run()
