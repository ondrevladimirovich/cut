# main.py

from flask import Blueprint, render_template, jsonify, session, request, redirect
import project.functions as Functions

main = Blueprint('main', __name__)

# PAGES

@main.route('/')
def index():
    if 'user_id' in session:
        data = {}
        data['current_user'] = Functions.get_current_user_object(session)
        data['regions'] = Functions.get_regions_for_tab(session['user_id'])

        devices = Functions.get_devices_for_tab(session['user_id'])
        data['devices'] = devices['devices']
        data['devices_total_count'] = devices['devices_total_count']

        data['device_types'] = Functions.get_device_types_for_tab(session['user_id'])
        return render_template('index.html', data = data)
    else:
        return render_template('auth.html')

@main.route('/logout')
def logout():
    if 'user_id' in session:
        session.clear()
        return redirect('/')

@main.route('/users')
def users():
    if 'user_id' in session:
        data = {}
        data['current_user'] = Functions.get_current_user_object(session)
        data['system_roles'] = Functions.get_system_roles()

        if data['current_user']['role_id'] == 1:
            data['interface_users'] = Functions.get_interface_users()['users']
            return render_template('users.html', data = data)
        else:
            return render_template('index.html', data = data)
    else:
        return render_template('auth.html')

@main.route('/areas')
def areas():
    if 'user_id' in session:
        data = {}
        data['current_user'] = Functions.get_current_user_object(session)

        if data['current_user']['role_id'] == 1:
            return render_template('areas.html', data = data)
        else:
            return render_template('index.html', data = data)
    else:
        return render_template('auth.html')

# AJAX

@main.route('/login', methods=['POST'])
def login():
    login = request.form['login']
    password = request.form['password']

    response = {}

    #найти в БД пользователя по паре-логин пароль
    current_user = Functions.get_db_user(login, password)

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

@main.route('/create_user_ajax', methods=['POST'])
def create_user_ajax():
    response = Functions.create_user(request.form)
    return response

@main.route('/delete_user_ajax', methods=['POST'])
def delete_user_ajax():
    response = Functions.delete_user(request.form)
    return response

@main.route('/get_devices_for_map_ajax', methods=['POST'])
def get_devices_for_map_ajax():
    response = Functions.get_devices_for_map_tab(session['user_id'])
    return jsonify(response)

@main.route('/get_users_ajax', methods=['POST'])
def get_users_ajax():
    response = Functions.get_interface_users()
    return jsonify(response)

@main.route('/get_devices_ajax', methods=['POST'])
def get_devices_ajax():
    page_size = request.form['page_size']
    page_number = request.form['page_number']

    response = Functions.get_devices_for_tab(session['user_id'], page_size, page_number)
    return jsonify(response)