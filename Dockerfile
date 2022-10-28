FROM "node18"

WORKDIR /backend-monolith

ADD . /backend-monolith

RUN yarn install
RUN yarn run build

CMD ["yarn", "run", "start"]

EXPOSE 8080
