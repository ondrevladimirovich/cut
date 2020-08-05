import pyodbc
import project.config as Config

# установка соединения с БД
def db_conn():
    server = Config.server
    database = Config.database
    username = Config.username
    password = Config.password 
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = cnxn.cursor()
    return cursor

# поиск пользователя в БД для логина
def get_db_user(login, password):
    cursor = db_conn()
    cursor.execute("EXEC [interface].[Login] @login = '" + login + "', @password = '" + password + "';")

    row = cursor.fetchone() 

    if(row):
        user = {}
        user['id'] = row[0]
        user['role_id'] = row[1]
        user['name'] = row[2]
        return user
    else:
        return False

# получение из сессии текущего пользователя в удобном виде
def get_current_user_object(session):
    current_user = {}
    current_user['user_id'] = session['user_id']
    current_user['role_id'] = session['role_id']
    current_user['name'] = session['name']
    return current_user

# вызов ХП на получение всех пользователей
def get_interface_users():
    data = []
    cursor = db_conn()
    cursor.execute("EXEC [interface].[GetUsers];")
    rows = cursor.fetchall()
    for row in rows:
        user = {}
        user['id'] = row[0]
        user['login'] = row[1]
        user['role_id'] = row[2]
        user['name'] = row[3]
        user['surname'] = row[4]
        user['patronymic'] = var_none_check(row[5])
        user['email'] = var_none_check(row[6])
        user['comment'] = var_none_check(row[7])
        user['company'] = var_none_check(row[8])
        user['department'] = var_none_check(row[9])
        user['position'] = var_none_check(row[10])
        user['role_name'] = var_none_check(row[11])
        data.append(user)

    return data

# вызов ХП с информацией для таба "филиалы"
# TODO: выводить данные только касающиеся его устройств [или регионов - тут пока не ясно] - актуально на стороне ХП
def get_regions_for_tab(user_id):
    data = []
    cursor = db_conn()
    cursor.execute("EXEC [interface].[GetRegions] @user_id =" + str(user_id) + ";")
    rows = cursor.fetchall()
    for row in rows:
        region = {}
        region['name'] = row[0]
        region['total'] = row[1]
        region['available'] = row[2]
        region['percent'] = round(float(row[2] / row[1]) * 100, 2)
        data.append(region)

    return data

def get_device_types_for_tab(user_id):
    data = []
    cursor = db_conn()
    cursor.execute("EXEC [interface].[GetDeviceTypes] @user_id =" + str(user_id) + ";")
    rows = cursor.fetchall()
    for row in rows:
        device_type = {}
        device_type['name'] = row[0]
        device_type['total'] = row[1]
        data.append(device_type)

    return data


#проверить переменную на значение None
#возвращается пустая строка если None
def var_none_check(var):
    return var if var else ''