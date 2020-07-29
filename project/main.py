# main.py

from flask import Blueprint, render_template, jsonify
from flask_login import login_required, current_user
import project.functions as Functions

main = Blueprint('main', __name__)

#auth = False

@main.route('/')
def index():
    #if auth == True:
        return render_template('auth.html')
    #else:
        #return render_template('index.html')

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

#@main.route('/profile')
#@login_required
#def profile():
    #return render_template('profile.html', name=current_user.name)