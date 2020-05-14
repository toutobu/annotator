FROM node:12.16.3-stretch
WORKDIR /frontend
ENV TZ="Asia/Tokyo"

ADD package.json /frontend/package.json
ADD package-lock.json /frontend/package-lock.json

RUN npm install -g @vue/cli \
  && npm install

ADD . /frontend
