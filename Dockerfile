FROM node:4.1.2
COPY . /carbono-mocks
WORKDIR /carbono-mocks
RUN npm install

EXPOSE 3000

CMD ["/bin/sh", "-c", "node ."]
