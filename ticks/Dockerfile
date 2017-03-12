FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY src/ /usr/src/app

EXPOSE 8081
RUN npm install
CMD ["npm", "start"]
