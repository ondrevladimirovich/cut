import pyodbc
import project.config as Config

def db_conn():
    server = Config.server
    database = Config.database
    username = Config.username
    password = Config.password 
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = cnxn.cursor()
    return cursor

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

def get_user_object(session):
    user = {}
    user['user_id'] = session['user_id']
    user['role_id'] = session['role_id']
    user['name'] = session['name']
    return user

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
        user['patronymic'] = row[5]
        user['email'] = row[6] 
        user['comment'] = row[7]
        user['company'] = row[8]
        user['department'] = row[9]
        user['position'] = row[10]
        data.append(user)

    return data