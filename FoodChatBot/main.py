from fastapi import FastAPI,Request
from starlette.responses import JSONResponse
import db_helper
import generic_helper

app = FastAPI()

inprogress_orders = {}

@app.get('/')
def read_root():
    return {"Hello": "World"}
@app.get('/aru')
def print_goru():
    print("Aru")
    return {"Aru":"Boy"}

@app.post('/')
async def handle_request(request: Request):
    payload = await request.json()


    # Extract necessary fields from the payload
    intent = payload['queryResult']['intent']['displayName']
    parameters= payload['queryResult']['parameters']
    # numbers = parameters['number']
    # food_items = parameters['food-items']
    output_contexts = payload['queryResult']['outputContexts']
    str = output_contexts[0]['name']
    session_id = generic_helper.extract_session_id(str)

    print("hello")
    print(intent)
    # print("numbers :",numbers)
    print("check")
    # print("foods: ",food_items)
    print("parameters: ", parameters)
    print(session_id)
    # Prepare the response in the format Dialogflow expects

    intent_handler_dict = {
        'order.add - context: ongoing-order': add_to_order,
        'order.remove - context: ongoing-order': remove_from_order,
        'order.complete - context: ongoing-order': complete_order,
        'track.order - context: ongoing-tracking': track_order
    }
    return intent_handler_dict[intent](parameters, session_id)

def save_to_db(order: dict):
    next_order_id = db_helper.get_next_order_id()

    for food_item, quantity in order.items():
        rcode = db_helper.insert_order_item(
            food_item,
            quantity,
            next_order_id
        )

        if rcode == -1:
            return -1

    db_helper.insert_order_tracking(next_order_id, "in progress")

    return next_order_id

def complete_order(parameters: dict, session_id: str):
    if session_id not in inprogress_orders:
        fulfillment_text = "I'm having a trouble finding your order. Sorry! Can you place a new order please?"
    else:
        order = inprogress_orders[session_id]
        order_id = save_to_db(order)
        if order_id == -1:
            fulfillment_text = "Sorry, I couldn't process your order due to a backend error. " \
                               "Please place a new order again"

        else:
            order_total = db_helper.get_total_order_price(order_id)

            fulfillment_text = f"Awesome. We have placed your order. " \
                           f"Here is your order id # {order_id}. " \
                           f"Your order total is {order_total} which you can pay at the time of delivery!"

        del inprogress_orders[session_id]

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text
    })

def add_to_order(parameters: dict, session_id: str):
    food_items = parameters["food-items"]
    quantities = parameters["number"]
    if len(food_items) != len(quantities):
        fulfillment_text = "Sorry I didn't understand. Can you please specify food items and quantities clearly?"
        print("Length mismatch")
        return JSONResponse(content={
            "fulfillmentText": fulfillment_text
        })
    else:
        new_food_dict = dict(zip(food_items, quantities))

        if session_id in inprogress_orders:
            current_food_dict = inprogress_orders[session_id]
            current_food_dict.update(new_food_dict)
            inprogress_orders[session_id] = current_food_dict
        else:
            inprogress_orders[session_id] = new_food_dict

        order_str = generic_helper.get_str_from_food_dict(inprogress_orders[session_id])
        fulfillment_text = f"So far you have: {order_str}. Do you need anything else?"

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text
    })

# print("***********")
# print(inprogress_orders)

#To remove from order:-->
#Step 1: --> Locate the sessiojn id records {"pizzas" : 2, "samosa" : 1}
#Step 2 : --> Get the value from dict {"pizzas" : 2, "samosa" : 1}
#Step 3 :--> Remove the food items

# inprogress_orders = {
#     "session_id_1" : {"pizzas" : 2, "samosa" : 1},
#     "session_id_2" : {"chhole" : 1}
# }


def remove_from_order(parameters: dict, session_id: str):
    if session_id not in inprogress_orders:
        return JSONResponse(content={
            "fulfillmentText": "I'm having a trouble finding your order. Sorry! Can you place a new order please?"
        })

    food_items = parameters["food-item"]
    current_order = inprogress_orders[session_id]

    removed_items = []
    no_such_items = []

    for item in food_items:
        if item not in current_order:
            no_such_items.append(item)
        else:
            removed_items.append(item)
            del current_order[item]

    if len(removed_items) > 0:
        fulfillment_text = f'Removed {",".join(removed_items)} from your order!'

    if len(no_such_items) > 0:
        fulfillment_text = f' Your current order does not have {",".join(no_such_items)}'

    if len(current_order.keys()) == 0:
        fulfillment_text += " Your order is empty!"
    else:
        order_str = generic_helper.get_str_from_food_dict(current_order)
        fulfillment_text += f" Here is what is left in your order: {order_str}"

    return JSONResponse(content={
        "fulfillmentText": fulfillment_text
    })

def track_order(parameters:dict, session_id: str):
    # print("Reached tracker") vv
    print("function reached")
    order_id = parameters['order_id']
    print(order_id)
    order_status =  db_helper.get_order_status(order_id)
    if order_status:
        fulfillment_text = f"The order status of the order id is {order_id} : {order_status}"
    else:
        fulfillment_text = f"No order found for the order id : {order_id}"
    # print(fulfillment_text) vv
    return JSONResponse(content={
        "fulfillmentText":fulfillment_text
    })
