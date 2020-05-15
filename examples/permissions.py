import jwt
from rest_framework import permissions


class IsPermittedScope(permissions.BasePermission):
    required_scope = 'read:examples'

    # TODO: get_permission を上書きして method 毎に permission を切り替える
    # https://github.com/encode/django-rest-framework/blob/d7777ea10ff40e0abf145df707b7701a65960249/rest_framework/views.py#L274

    def has_permission(self, request, view):
        token = self.get_token_auth_header(request)
        if token:
            decoded = jwt.decode(token, verify=False)
            if decoded.get('scope'):
                token_scopes = decoded['scope'].split()
                return 'read:examples' in token_scopes

    def get_token_auth_header(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION', None)
        if auth:
            parts = auth.split()
            token = parts[1]
            return token


class ReadExamplesScope(IsPermittedScope):
    pass


class ReadAnnotationsScope(IsPermittedScope):
    required_scope = 'read:annotations'


class UpdateAnnotationsScope(IsPermittedScope):
    required_scope = 'update:annotations'
