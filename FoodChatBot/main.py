from fastapi import FastAPI, Request
from starlette.responses import JSONResponse

app = FastAPI()

@app.post('/')
async def handle_request(request: Request):
    payload = await request.json()

    # Extract necessary fields from the payload
    intent = payload['queryResult']['intent']['displayName']
    order_id= payload['queryResult']['parameters']['order_id']
    # output_contexts = payload['queryResult']['outputContexts']
    print("hello")
    # Prepare the response in the format Dialogflow expects

    return JSONResponse(content={
        "fulfillmentText":f"ok so your id is {order_id}"
    })
