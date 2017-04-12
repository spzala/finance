from openpyxl import load_workbook
from flask import Flask
import json
import pika
import os

app = Flask(__name__)

channel_name = "stocks"

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)

def consumeStocks():
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

@app.route("/process")
def processStocks():
	consumeStocks()
	return 'process'

@app.route('/')
def index():
    return 'Index Page'

if __name__ == '__main__':
    app.run(host='0.0.0.0')