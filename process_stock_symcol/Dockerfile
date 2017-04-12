FROM python:latest

WORKDIR /usr/src/app
COPY src/ /usr/src/app

EXPOSE 5000
RUN pip install flask
RUN pip install openpyxl
RUN pip install pika
CMD ["python", "process_stock.py"]
