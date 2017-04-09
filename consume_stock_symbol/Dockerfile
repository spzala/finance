FROM python:latest

RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app
COPY src/ /usr/src/app

EXPOSE 5000
RUN pip install flask
RUN pip install openpyxl
CMD ["python", "ticks.py"]
