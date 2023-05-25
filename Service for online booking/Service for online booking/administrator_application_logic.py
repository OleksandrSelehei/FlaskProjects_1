import sqlite3
import datetime
import json


# функція додовання номерів готелів
def add_hotel(name=str, location=str, description=str, hotel_number=int, price=float):
    # підключення до бази данних
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    # запит до бази данних а саме додовання в БД
    c.execute("INSERT INTO hotel(name, location, hotel_number, price, description, date) VALUES (?, ?, ?, ?, ?, ?)",
              (name, location, hotel_number, price, description, json.dumps([["0001-01-01", "0001-01-01"]])))
    # оновлення бази
    conn.commit()
    conn.close()


# додовання авіаквитків
def add_flight(air_company=str, airport_departing=str, airport_arrives=str, country_departing=str, departure_date=str,
               departure_time=str, arrival_time=str, seat_number=int, price=float, country_arrives=str):
    # підготовка данних для запиту а саме перетворення в потрібний тип данних
    departure_date = departure_date.split('-')
    departure_date = list(map(int, departure_date))
    departure_date = datetime.date(departure_date[0], departure_date[1], departure_date[2])
    departure_time = departure_time.split(':')
    departure_time = list(map(int, departure_time))
    departure_time = datetime.time(departure_time[0], departure_time[1])
    departure_time = departure_time.strftime("%H:%M:%S")
    arrival_time = arrival_time.split(':')
    arrival_time = list(map(int, arrival_time))
    arrival_time = datetime.time(arrival_time[0], arrival_time[1])
    arrival_time = arrival_time.strftime("%H:%M:%S")
    # підключення до БД
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    # запит на додовання
    c.execute(
        "INSERT INTO flight(air_company, airport_departing, airport_arrives, country_departing, country_arrives, departure_date, departure_time, arrival_time, seat_number, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (air_company, airport_departing, airport_arrives, country_departing, country_arrives, departure_date,
         departure_time, arrival_time, seat_number, price))
    # оновлення БД
    conn.commit()
    conn.close()


# додовання екскурсії
def add_excursion(name=str, location=str, date=str, price=float, places=int, description=str):
    # підготовка данних
    date = date.split('-')
    date = list(map(int, date))
    date = datetime.date(date[0], date[1], date[2])
    # підключення до БД
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    # запит на додавання данних в БД
    c.execute("INSERT INTO excursion(name, location, data, price, places, description) VALUES (?, ?, ?, ?, ?, ?)",
              (name, location, date, price, places, description))
    # оновлення БД
    conn.commit()
    conn.close()


# авторизація адміністратора
def administrative_users_authorization(login, password):
    # підключення
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    # запит на пошук в БД потрібного юзера
    c.execute("SELECT password FROM administrative_users WHERE login = ?", (login,))
    # отримання данних та збереження в змінну
    result = c.fetchall()
    # перевірка чи є позитивний результат від пошуку
    if len(result) != 0:
        # перебір параметру юзера
        for item in result[0]:
            # перевірка на правльність паролю
            if item == password:
                return 'admin/hotels'
            else:
                return 'Введено неправильний пароль'
    else:
        return 'Введено неправильний логін'
    # оновлення
    conn.commit()
    conn.close()


if __name__ == '__main__':
    print(True)