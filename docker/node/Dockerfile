FROM node:20.17-slim AS builder
WORKDIR /home/node/app

COPY ./api/package*.json ./
RUN npm install --ignore-scripts

COPY ./api .

RUN npm run build

ENV TZ=Europe/Paris

EXPOSE 3000

RUN useradd --user-group --create-home --shell /bin/false appuser
USER appuser

CMD ["npm", "run", "dev"]