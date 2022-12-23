FROM node:latest

RUN mkdir -p /usr/share/zoneinfo/Asia/
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo 'Asia/Shanghai' >/etc/timezone

RUN dpkg-reconfigure -f noninteractive tzdata

COPY package.json .npmrc yarn.lock /usr/app/
WORKDIR /usr/app/
RUN yarn install
ENV TZ Asia/Shanghai
ENV NODE_ENV production
ENV PATH /usr/app/node_modules/.bin:$PATH

EXPOSE 3000
ENTRYPOINT ["node", "index.js"]