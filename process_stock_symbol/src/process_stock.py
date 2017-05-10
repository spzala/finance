from openpyxl import load_workbook
from flask import Flask
import json
import pika
import os
import threading
import requests
import time

app = Flask(__name__)

channel_name = "stocks"

base_url = "http://stock_price:8080/stockPrice/"

def callback(ch, method, properties, body):
	symbol = str(body, 'utf-8')
	url = base_url + symbol
	print(" [x] Received %r" % body)
	resp = requests.get(url)
	status = resp.status_code
	if status == 200 or status == 304:
		print("Received response: %r" % resp.text)
	else:
		print('Error status code: ', status)


def consume():
	print('Consuming stocks')
	host = os.getenv('QUEUE_HOST', 'localhost')
	print(host)
	connection = pika.BlockingConnection(pika.ConnectionParameters(host=host))
	channel = connection.channel()

	channel.queue_declare(queue=channel_name)

	channel.basic_consume(callback,
    	                  queue=channel_name,
        	              no_ack=True)
	print(' [*] Waiting for messages. To exit press CTRL+C')
	channel.start_consuming()


def consumeStocks():
	t = threading.Thread(target=consume)
	t.start()

@app.route("/process")
def processStocks():
	consumeStocks()
	return 'process'

@app.route('/')
def index():
    return 'Index Page'

print ("Welcome to process stock")
if __name__ == '__main__':
    app.run(host='0.0.0.0')

