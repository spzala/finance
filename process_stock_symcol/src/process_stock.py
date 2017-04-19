from openpyxl import load_workbook
from flask import Flask
import json
import pika
import os
import threading
import requests

app = Flask(__name__)

channel_name = "stocks"

base_url = "http://stock_price:8080/stockPrice/GOOG"

def callback(ch, method, properties, body):
	resp = requests.get(base_url)
	status = resp.status_code

# check that we either got a successful response (200) or a previously retrieved, but still valid response (304)
	if status == '200' or status == '304':
		print 'Received response'
#    reviews = toList(json.loads(resp[u'body'])[u'reviews'],u'reviewData')
#    reviewerLists = map(uncompletedReviewers,reviews)
#    reviewers = reduce(lambda a, b: set(a).union(set(b)), reviewerLists, set())
#    print 'Incomplete Reviewers: '
#    for r in reviewers:
#        print '    ',r
	else:
		print 'Error status code: ', status

	print(" [x] Received %r" % body)

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

if __name__ == '__main__':
    app.run(host='0.0.0.0')