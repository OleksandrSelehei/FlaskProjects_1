import sqlite3
import datetime
import json


# підготовка данних для перевірки інтервалу часу
def date_transform(date_str=str):
    # трансформація з типу строка в тип дата
    date_obj = datetime.datetime.strptime(date_str, '%Y-%m-%d')
    return date_obj.date()


# перевірка чи існує певна дата в певному інтервалі
def check_intervals(interval1, interval2):
    # розбіття на початок і кінець інтервалу
    start1, end1 = interval1
    start2, end2 = interval2
    # створення по денном інтервалу
    delta = datetime.timedelta(days=1)

    # перевіряєм кожний день из interval1
    current_date = start1
    while current_date <= end1:
        # якщо данна дата поподає в interval2, то повертаєм False
        if start2 <= current_date <= end2:
            return False
        current_date += delta

    # якщо ні одна дата з interval1 не попала в interval2, то повертаємо True
    return True


##########################################ВИВІД ІНФОРМАЦІЇ НА СТОРІНКУ ЗА ПАРАМЕТРАМИ###################################


# пошук екскурсій за параметрами
def search_excursion(location=str, date=str):
    # підключення до БД
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    if len(location) == 0:
        return all_search_excursion()
    elif len(date) == 0:
        # запит до БД
        c.execute("SELECT * FROM excursion WHERE location=?", (location,))
        # збереження результату
        result = c.fetchall()
    else:
        # запит до БД
        c.execute("SELECT * FROM excursion WHERE location=? and data=?", (location, date))
        # збереження результату
        result = c.fetchall()
    conn.commit()
    conn.close()
    return result


# пошук авіаквитків за параметрами
def search_flight(air_company=str, country_departing=str, country_arrives=str, departure_date=str, departure_time=str):
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    c.execute(
        "SELECT * FROM flight WHERE air_company = ? AND country_departing = ? AND country_arrives = ? AND departure_date >= ? AND departure_time >= ?",
        (air_company, country_departing, country_arrives, departure_date, departure_time))
    # збереження результатау
    result = c.fetchall()
    conn.commit()
    conn.close()
    return result


# пошук готелів за параметрами
def search_hotel(location=str, data_start=str, data_end=str):
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    result = []
    # запит до таблиці кімнат
    if len(location) == 0:
        c.execute("SELECT * FROM hotel")
    else:
        c.execute("SELECT * FROM hotel WHERE location = ?", [location])
    result_booking = c.fetchall()
    if len(data_start) == 0 or len(data_end) == 0:
        return result_booking
    else:
        # підготовка отриманних данних від користувача а саме початое і кінець діапозону дат бронювання
        interval_1 = (date_transform(data_start), date_transform(data_end))
    # перебір кімнати
        for element in result_booking:
            date_set = json.loads(element[5])
            for date_check in date_set:
                # перевірка чи вільна кімната на даний період
                result_bool = check_intervals(interval_1, (date_transform(date_check[0]), date_transform(date_check[1])))
                if result_bool is True:
                    result.append(element)
    conn.commit()
    conn.close()
    # повернення всіх вільних кімнат
    return result


# функція яка виводить всі записи про готелі з БД
def all_search_hotel():
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    c.execute("SELECT * FROM hotel")
    result = c.fetchall()
    conn.commit()
    conn.close()
    return result


# функція яка виводить всі записи про авіаквитки з БД
def all_search_flight():
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    c.execute("SELECT * FROM flight")
    result = c.fetchall()
    conn.commit()
    conn.close()
    return result


# функція яка виводить всі записи про екскурсії з БД
def all_search_excursion():
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    c.execute("SELECT * FROM excursion")
    result = c.fetchall()
    conn.commit()
    conn.close()
    return result


########################################################################################################################


##############################################КУПІВЛЯ ТА БРОНБВАННЯ#####################################################

# функція для купівлі авіаквитків
def buy_flight(air_company=str, country_departing=str, country_arrives=str, departure_date=str, departure_time=str,
               set_number=int):
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    # пошук квитку для отримання данних для чеку
    c.execute(
        "SELECT * FROM flight WHERE air_company = ? AND country_departing = ? AND country_arrives = ? AND departure_date = ? AND departure_time = ? AND seat_number = ?",
        (air_company, country_departing, country_arrives, departure_date, departure_time, set_number))
    result = c.fetchall()
    # видалення квитку з бази данних так як його купили
    c.execute(
        "DELETE FROM flight WHERE air_company = ? AND country_departing = ? AND country_arrives = ? AND departure_date = ? AND departure_time = ? AND seat_number = ?",
        (air_company, country_departing, country_arrives, departure_date, departure_time, set_number))
    conn.commit()
    conn.close()
    # повернення данних для чеку
    return result


# купівля квитків на екскурсію
def buy_excursion(name_excursion=str, country=str, date_start=str):
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    # отримання данних для чеку та перевірка чи є такі квитки ще в базі
    c.execute("SELECT * FROM excursion WHERE name = ? AND location = ? AND data = ?",
              (name_excursion, country, date_start))
    result = c.fetchall()
    if len(result) != 0:
        # віднімання від кількості квитків куплений квиток
        new_places = result[0][4] - 1
        # якщо квитки закінчилися то відаляєм екскурсію з БД
        if new_places == 0:
            c.execute("DELETE FROM excursion WHERE name = ? AND location = ? AND data = ?",
                      (name_excursion, country, date_start))
        # якщо квитків достатньо просто віднімаємо куплений
        else:
            c.execute("UPDATE excursion SET places = ? WHERE name = ? AND location = ? AND data = ?",
                      (new_places, name_excursion, country, date_start))
    else:
        result = "Error"
    conn.commit()
    conn.close()
    return result


# бронювання номерів
def buy_hotel_number(name_hotel=str, country=str, date_start=str, date_end=str, number=int):
    if len(date_start) == 0 or len(date_end) == 0:
        return [["Ведіть термін оренди!"]]
    interval_1 = (date_transform(date_start), date_transform(date_end))
    conn = sqlite3.connect('maindatabase.db')
    c = conn.cursor()
    flag = []
    # перевірка чи номер є в базі даних
    c.execute("SELECT * FROM hotel WHERE name = ? AND hotel_number = ? AND location = ?",
              (name_hotel, number, country))
    result_db = c.fetchall()
    # якщо так
    if result_db != 0:
        for element in result_db:
            date_set = json.loads(element[5])
            for date_check in date_set:
                # перевірка чи вільна кімната на даний період
                result_bool = check_intervals(interval_1, (date_transform(date_check[0]), date_transform(date_check[1])))
                flag.append(result_bool)
    if False in flag:
        conn.commit()
        conn.close()
        return [["На жаль на цей термін кімната вже заброньована!"]]
    else:
        date_set = json.loads(result_db[0][5])
        date_set.append([date_start, date_end])
        date = json.dumps(date_set)
        c.execute("UPDATE hotel SET date = ? WHERE name = ? AND hotel_number = ? AND location = ?",
                  (date, name_hotel, number, country))
        conn.commit()
        conn.close()
        return result_db

########################################################################################################################


if __name__ == '__main__':
    print(True)
