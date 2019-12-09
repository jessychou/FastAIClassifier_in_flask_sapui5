import os

# uncomment the line below for postgres database url from environment variable
# postgres_local_base = os.environ['DATABASE_URL']

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False


class DevelopmentConfig(Config):
    # uncomment the line below to use postgres
    # SQLALCHEMY_DATABASE_URI = postgres_local_base
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost/local_mma'

    # SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'flask_boilerplate_main.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'mma_test.db')
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # uncomment the line below to use postgres
    # SQLALCHEMY_DATABASE_URI = postgres_local_base
    # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost/local_mma'
    SQLALCHEMY_DATABASE_URI = "hana+pyhdb://{username}:{password}@{host}:{port}" \
        .format(username='USR_2ZB9FFM1IMGIS79FVIBEG9UCU', password='Ld4QYQxkLPG3aGX3z_Qdao3sHNGBvOHEKp8P3pac.BvFF-EEubH.8S9Auvl34cVp0zJcijFzRtgNsM_N8RLqRsDT6bTy7qHp3Z6zgcufqeVfeSCKqA8BoqcmCzPR6g3z', host='zeus.hana.canary.eu-central-1.whitney.dbaas.ondemand.com', port='30015')
    # print("SQLALCHEMY_DATABASE_URI is ", SQLALCHEMY_DATABASE_URI)



config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY
