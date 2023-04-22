from functools import lru_cache

from pydantic import BaseSettings


# BaseSettings automatically bind os.environ with lowercase()
class Cfg(BaseSettings):
    openai_api_key: str


@lru_cache()
def get_config():
    return Cfg()
