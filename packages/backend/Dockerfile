FROM node:alpine

RUN echo "building backend"
RUN mkdir tabs
WORKDIR /tabs
COPY ./ /tabs/
RUN npm install
RUN echo "${DB_HOST} ${DB_USERNAME} ${DB_PASSWORD} ${HTTP_PORT}"
EXPOSE ${PORTS}

CMD ["npm", "dev"]