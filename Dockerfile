FROM node as node
EXPOSE 3000

WORKDIR /usr/src

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn

COPY . .

RUN yarn build

# RUN /usr/bin/google-chrome --headless --no-sandbox
ENTRYPOINT ["dumb-init", "--", "/src/entrypoint.sh"]

RUN echo "Starting web server....."

FROM nginx
COPY --from=node /usr/src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]