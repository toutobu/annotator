from django.contrib.auth import authenticate
import json
import jwt
import logging
import os
import requests


logger = logging.getLogger(__name__)


def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username


def jwt_decode_token(token):
    domain = os.environ['AUTH0_API_DOMAIN']
    identifier = os.environ['AUTH0_API_IDENTIFIER']
    algorighms = ['RS256']

    header = jwt.get_unverified_header(token)
    jwks = (requests.get('https://{}/.well-known/jwks.json'.format(domain))
            .json())
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise Exception('Public key not found.')

    issuer = 'https://{}/'.format(domain)
    return jwt.decode(token, public_key, audience=identifier, issuer=issuer,
                      algorithms=algorighms)
