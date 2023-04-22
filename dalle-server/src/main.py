import logging

import openai
import uvicorn
from dotenv import dotenv_values
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai.openai_object import OpenAIObject

cfg = dotenv_values('.env')



app = FastAPI(title='Dalle image api server')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping", status_code=status.HTTP_200_OK)
async def pong():
    return {"ping": "pong!"}


@app.get("/img/")
async def get_img(desc: str):
    b64_json = await get_a_img_from_openai(desc)
    return JSONResponse(content=b64_json)


async def get_a_img_from_openai(desc:str):
    openai_obj:OpenAIObject = await openai.Image.acreate(
            api_key=cfg['OPENAI_API_KEY'],
            prompt=desc,
            n=1,
            size="512x512",
            response_format="b64_json",
        )

    return openai_obj['data'][0]

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="127.0.0.1", port=8080, reload=True)
