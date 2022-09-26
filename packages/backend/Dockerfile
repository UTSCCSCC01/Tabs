FROM node:latest

RUN echo "building backend"
RUN mkdir -p tabs/packages/backend

WORKDIR /tabs/packages/backend
COPY ./ /tabs/packages/backend

RUN ls
RUN cd /tabs/packages/backend
RUN npm install && \
 npm run build

EXPOSE ${BACKEND_PORT}

CMD ["npm", "start"]