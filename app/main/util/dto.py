from flask_restplus import Namespace, fields, abort
from functools import wraps
from flask import request
import os
import json

if 'VCAP_SERVICES' in os.environ:
    services = json.loads(os.getenv('VCAP_SERVICES'))
    uaa_service = services["xsuaa"][0]["credentials"]
else:
    print("cant have xsuaa credentials in local environment!!!!!!!!!!!")


class NLPDto:
    api = Namespace('nlp', description='nlp related operations')
    # nlp = api.model('nlp', {
        # 'meeting_id': fields.Integer(required=True, description='The meeting identifier')
    # })
