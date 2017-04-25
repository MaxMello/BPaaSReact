FROM ubuntu:trusty

RUN apt-get update -qq && apt-get install -qqy software-properties-common curl && \
  curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
  apt-get install -qqy nodejs libfontconfig && \
  rm /etc/apt/sources.list.d/nodesource.list && \
  npm install -g npm && \
  cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

EXPOSE 80
ENV BIND_HOST=0.0.0.0
CMD ["npm", "start"]
WORKDIR /usr/app

ADD package.json /usr/app/
RUN npm install
RUN rm package.json

ADD .babelrc webpack.config.js /usr/app/
