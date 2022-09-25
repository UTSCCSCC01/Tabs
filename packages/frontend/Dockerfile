FROM node:latest

RUN mkdir tabs
WORKDIR /tabs
COPY ./ /tabs/
RUN npm install

RUN echo ${PORTS}
EXPOSE ${PORT}

CMD ["npm", "start", ${CLIENT_OS}]