FROM node:latest

RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app
COPY src/ /usr/src/app
COPY tmp/tickers.xlsx /usr/tickers.xlsx

EXPOSE 8080
RUN npm install
CMD ["npm", "start"]
