import os
import unittest

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app import blueprint
from app.main import create_app, db

# app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
# app = create_app('dev')
app = create_app('prod')
app.register_blueprint(blueprint)

app.app_context().push()

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


@manager.command
def run():
    print("run app!!!")
    app.run()


@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


if __name__ == '__main__':
    # For prod
    # port = int(os.getenv("PORT", 8080))
    # For dev
    # print("Come to start worker!!!!!!!!!!!!!!!!!!!!!")
    # start_worker()
    port = int(os.getenv("PORT", 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
    print("Statement should not been printed after the function!!!!!")

    # manager.run()
