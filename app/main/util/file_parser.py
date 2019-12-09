import werkzeug
from flask_restplus import reqparse

file_upload = reqparse.RequestParser()
file_upload.add_argument('audio_file',
                         type=werkzeug.datastructures.FileStorage,
                         location='files',
                         required=True,
                          help='mp4 format')
file_upload.add_argument('mode', type=str, help='Mode of transcription', location='form')
file_upload.add_argument('meeting_id', type=str, help='Meeting Minutes ID(optional)', location='form')
file_upload.add_argument('user_id', type=str, help='User Identifier(required)', location='form')


action_update_helper = reqparse.RequestParser()
action_update_helper.add_argument('actions', type=str, help = 'actions to be updated', location='json')

nlp_caption_file_upload = reqparse.RequestParser()
nlp_caption_file_upload.add_argument('caption_file',
                                     type=werkzeug.datastructures.FileStorage,
                                     location='files',
                                     required=True,
                                     help='vtt format')

fish_upload = reqparse.RequestParser()
fish_upload.add_argument('image_file',
                         type=werkzeug.datastructures.FileStorage,
                         location='files'
                         # required=True
                         )
