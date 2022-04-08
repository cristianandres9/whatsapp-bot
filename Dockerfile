FROM centos:7
WORKDIR /opt/project
USER root
RUN mkdir whatsapp-bot
COPY package.json /opt/project/whatsapp-bot
COPY index.js /opt/project/whatsapp-bot
RUN cd whatsapp-bot
RUN npm install
RUN npm start