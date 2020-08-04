# main.py

from flask import Blueprint, render_template, jsonify, session, request, redirect
import project.functions as Functions

main = Blueprint('main', __name__)

@main.route('/')
def index():
    if 'user_id' in session:
        current_user = Functions.get_current_user_object(session)
        return render_template('index.html', current_user = current_user)
    else:
        return render_template('auth.html')

@main.route('/login', methods=['POST'])
def login():
    login = request.form['login']
    password = request.form['password']

    response = {}

    #найти в БД пользователя по паре-логин пароль
    current_user = Functions.get_db_user(login, password);

    #если нашёлся - записать в сесиию id пользователя и id роли
    #и перенаправить снова на главную
    if(current_user):
        session['user_id'] = current_user['id']
        session['role_id'] = current_user['role_id']
        session['name'] = current_user['name']
        response['result'] = 1
        response['msg'] = '/'
    else:
        response['result'] = 0
        response['msg'] = 'Пользователь не найден или неверный пароль'

    return jsonify(response)

@main.route('/logout')
def logout():
    if 'user_id' in session:
        session.clear()
        return redirect('/')

@main.route('/users')
def users():
    if 'user_id' in session:
        current_user = Functions.get_current_user_object(session)

        if current_user['role_id'] == 1:
            interface_users = Functions.get_interface_users()
            return render_template('users.html', current_user = current_user, interface_users = interface_users)
        else:
            return render_template('index.html', current_user = current_user)
    else:
        return render_template('auth.html')

@main.route('/areas')
def areas():
    if 'user_id' in session:
        current_user = Functions.get_current_user_object(session)

        if current_user['role_id'] == 1:
            return render_template('areas.html', current_user = current_user)
        else:
            return render_template('index.html', current_user = current_user)
    else:
        return render_template('auth.html')

#всякие штуки для теста ниже

@main.route('/sqlversion')
def sqlversion():
    cursor = Functions.db_conn()
    cursor.execute("SELECT @@version;") 
    row = cursor.fetchone() 
    #while row: 
        #print(row[0])
        #row = cursor.fetchone()

    return jsonify(row[0])

@main.route('/test')
def test():
    data = []
    cursor = Functions.db_conn()
    cursor.execute("SELECT Description FROM SUBSYSTEMS;")
    rows = cursor.fetchall()
    for row in rows:
        data.append([x for x in row])

    #return jsonify(data)
    return render_template('test.html', data=data)

@main.route('/ses')
def ses():
    if 'user_id' in session:
        return session.get('user_id')
    else:
        return 'Nope'