from flask_restplus import Api
from flask import Blueprint, url_for

from .main.controller.nlp_controller import api as nlp_ns


class MyApi(Api):
    @property
    def specs_url(self):
        """Monkey patch for HTTPS"""
        scheme = 'http' if '5000' in self.base_url else 'https'
        print("scheme is =======================================")
        print(scheme)
        return url_for(self.endpoint('specs'), _external=True, _scheme=scheme)


blueprint = Blueprint('api', __name__)

api = MyApi(blueprint,
            version='1.0',
            title='Meeting Minutes Assistant RESTPLUS API',
            description="flask restplus web service for meeting minutes assistant")


# api = Api(blueprint,
#           title='Meeting Minutes Assistant RESTPLUS API',
#           version='1.0',
#           description='flask restplus web service for meeting minutes assistant'
#           )


api.add_namespace(nlp_ns, path='/nlp')
