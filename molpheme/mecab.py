import logging
import MeCab

from .molpheme import Morpheme


logger = logging.getLogger(__name__)


def mecab_analyzed(text):
    tagger = MeCab.Tagger()
    tagger.parse('')

    current_node = tagger.parseToNode(text.replace('\n', ''))

    while current_node:
        surface = current_node.surface
        features = current_node.feature.split(',')
        yield Morpheme(surface, features[0], features[1], features[-3])
        current_node = current_node.next
