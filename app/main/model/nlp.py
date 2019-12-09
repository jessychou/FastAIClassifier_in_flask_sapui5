import re
import datetime
import os
# try multi-threading
import concurrent.futures
import threading
import time
import itertools
# from app.main.model.ulmfit_classifier import ULMFIT
from flask import Flask
from fastai.text import *
from fastai.vision import *
from collections import Iterator
from threading import Lock
import time
import logging


logger = logging.getLogger('route.logger')
logging.basicConfig(stream=sys.stdout,
                    level=logging.DEBUG,
                    format='%(asctime)s %(filename)s[line:%(lineno)d] %(funcName)s %(name)-12s %(levelname)-8s %(message)s')

DIR_PATH = os.path.dirname(os.path.realpath(__file__))
HOME_FOLDER = os.path.abspath(__file__ + "/../../../../")
MODEL_FOLDER = HOME_FOLDER + '/app/main/model/'

app = Flask(__name__, static_url_path='')
app.config['MODEL_FOLDER'] = MODEL_FOLDER


class NLP:

    def __init__(self):
        self.image_classifier = load_learner(app.config['MODEL_FOLDER'], 'export.pkl')

    def image_predict(self, path, filename):
        TRAIN = Path(path)
        src = ImageList.from_folder(path=TRAIN)
        print("src is==============================")
        print(src)
        result = self.image_classifier.predict(src[0])
        print(result)
        res = {}
        res['category'] = str(result[0])
        res['species'] = int(result[1])
        res['all_prob'] = [float(probability) for probability in list(result[2])]
        res['prob'] = res['all_prob'][res['species']]
        print("res==========================================")
        print(res)
        return res

