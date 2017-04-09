FROM ubuntu:latest

RUN apt update && apt install -y mysql-client
COPY src/ /

#CMD sh
CMD "/create_table.sh"
