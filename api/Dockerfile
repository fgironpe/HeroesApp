FROM node:14.17

RUN npm install -g json-server

ARG WORK_DIR=/backend
ENV WORK_DIR ${WORK_DIR}

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY heroes.json ${WORK_DIR}/heroes.json

EXPOSE 3000

CMD json-server -H 0.0.0.0 --port 3000 --watch ${WORK_DIR}/heroes.json