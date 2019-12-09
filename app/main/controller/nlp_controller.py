import os
import logging
import sys
from flask import request, Flask
from flask_restplus import Resource

# from app.main.util.decorator import admin_token_required
from ..util.dto import NLPDto, authenticate
from ..service.nlp_service import get_image_result
from ..util.file_parser import nlp_caption_file_upload as parser
from ..util.file_parser import fish_upload as fishparser
from werkzeug.utils import secure_filename


logger = logging.getLogger('route.logger')
logging.basicConfig(stream=sys.stdout,
                    level=logging.DEBUG,
                    format='%(asctime)s %(filename)s[line:%(lineno)d] %(funcName)s %(name)-12s %(levelname)-8s %(message)s')

DIR_PATH = os.path.dirname(os.path.realpath(__file__))
HOME_FOLDER = os.path.abspath(__file__ + "/../../../../")
UPLOAD_FOLDER = HOME_FOLDER + '/uploads/'
DOWNLOAD_FOLDER = HOME_FOLDER + '/downloads/'
ALLOWED_EXTENSIONS = set(['mp4', 'pdf' ,'txt'])

app = Flask(__name__, static_url_path='')
# from manage import app
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER

api = NLPDto.api
# _nlp = NLPDto.nlp


@api.route('/image/', strict_slashes=False)
# @api.param('meeting_guid', 'The Global Unique Identifier')
# @api.response(404, 'Meeting not found.')
class NLPIMAGE(Resource):
    # decorators = [authenticate]
    @api.doc('Extract action items')
    @api.expect(fishparser, validate=False)
    # @api.marshal_with(_user)
    # @api.expect(_nlp)
    @api.response(200, 'Image successfully classified.')
    def post(self):
        print("come to image classification")
        """extract action items given the meeting identifier"""
        print("request is=======================")
        print(request.files)
        args = fishparser.parse_args()
        print("args is====================", args)
        uploaded_file = args['image_file']
        filename = secure_filename(uploaded_file.filename)
        # response = get_final_result(meeting_id=meeting_id)
        logon_name = 'I513765'
        try:
            uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], logon_name, filename))
            print("successfully upload files====================")
        except Exception as error:
            logger.debug("Cant save the file in upload folder due to " + str(error))

        # response = get_image_result(filename=os.path.join(app.config['UPLOAD_FOLDER'], logon_name, filename))
        response = get_image_result(path=os.path.join(app.config['UPLOAD_FOLDER'], logon_name), filename=filename)

        return response
