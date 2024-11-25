import mysql.connector

cnx = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="pandeyji_eatery"
)

def get_order_status(order_id:int):
    cursor = cnx.cursor()

    query = "SELECT status FROM order_tracking WHERE order_id= %s"

    cursor.execute(query,(order_id,))

    #fetch the result
    result = cursor.fetchone()

    #close cursor and connection
    cursor.close()

    if result is not None:
        return result[0]
    else:
        return None