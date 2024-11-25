from fastapi import FastAPI, Request
from starlette.responses import JSONResponse
import db_helper

app = FastAPI()

@app.post('/')
async def handle_request(request: Request):
    payload = await request.json()

    # Extract necessary fields from the payload
    intent = payload['queryResult']['intent']['displayName']
    parameters= payload['queryResult']['parameters']
    # output_contexts = payload['queryResult']['outputContexts']
    print("hello")
    # Prepare the response in the format Dialogflow expects

    if intent == "track.order - context: ongoing-tracking":
        track_order(parameters)

def track_order(parameters:dict):
    order_id = parameters['order_id']
    order_status = db_helper.get_order_status(order_id)
    if order_status:
        fulfillment_text = f"The order status of the order id{order_id} is : {order_status}"
    else:
        fulfillment_text = f"No order found for the order id : {order_id}"
    return JSONResponse(content={
        "fulfillmentText":fulfillment_text
    })
