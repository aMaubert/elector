FROM node:12.20.1-buster-slim

WORKDIR /workspace
#Don't forget ABI file to copy
COPY . /workspace/

RUN npm install && npm run build
EXPOSE 8080
CMD npm start
