from app.main import db
from app.main.model.nlp import NLP
from sqlalchemy.orm.exc import NoResultFound
# from app.main.db_mmg.database_dao import DataAccessObject

import json
import datetime


# connector = DataAccessObject()
nlp_instance = NLP()
# DB_TABLE = 'TEST2'
DB_TABLE = 'MINUTES'


def get_image_result(path, filename):
    return nlp_instance.image_predict(path, filename)
