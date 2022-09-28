FROM node:latest



EXPOSE ${FRONTEND_PORT1}
EXPOSE ${FRONTEND_PORT2}



#RUN apt-get update && apt-get install android-sdk -y
WORKDIR /tabs/packages/frontend
#ENV ANDROID_HOME = ${ANDROIDHOME}
COPY package.json .

#RUN npm install
CMD ["npm", "run", "start"]


