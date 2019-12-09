from flask_restplus import Namespace, fields, abort
from functools import wraps
from flask import request
import os
import json
from sap import xssec


if 'VCAP_SERVICES' in os.environ:
    services = json.loads(os.getenv('VCAP_SERVICES'))
    uaa_service = services["xsuaa"][0]["credentials"]
else:
    print("cant have xsuaa credentials in local environment!!!!!!!!!!!")


def authenticate(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not getattr(func, 'authenticated', True):
            return func(*args, **kwargs)
        if 'authorization' not in request.headers:
            # For local development
            return func(*args, **kwargs)
            # The End

            # abort(403)
        else:
            access_token = request.headers.get('authorization')[7:]
            security_context = xssec.create_security_context(access_token, uaa_service)
            acct = security_context.check_scope('openid')

        if acct:
            return func(*args, **kwargs)

        abort(401)
    return wrapper


class NLPDto:
    api = Namespace('nlp', description='nlp related operations')
    # nlp = api.model('nlp', {
        # 'meeting_id': fields.Integer(required=True, description='The meeting identifier')
    # })
