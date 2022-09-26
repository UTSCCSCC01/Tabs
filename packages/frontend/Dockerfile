FROM node:latest


ENV ADB_IP="192.168.1.1"
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.255.255.255"

EXPOSE ${FRONTEND_PORT1}
EXPOSE ${FRONTEND_PORT2}

RUN apt-get update -y && \
    apt-get install android-tools-adb -y

WORKDIR /tabs/packages/frontend
COPY package.json .

RUN npm install 
CMD adb connect 192.168.1.1:3000 && \
        npm run android



