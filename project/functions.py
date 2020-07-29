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

def get_user(login, password):
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