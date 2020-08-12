# init.py

from flask import Flask
import os
from flask_bootstrap import Bootstrap
import project.config as Config

def create_app():
    app = Flask(__name__)
    app.secret_key = 'skut mrf'

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    #port = int(os.environ.get('PORT', 5088))
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config['DEBUG'] = True
    #app.run(host='127.0.0.1', port=port)

    @app.context_processor
    def inject_stage_and_region():
        return dict(mrfName = Config.mrfName)

    Bootstrap(app)

    return app