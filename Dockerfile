# Angular App ========================================
FROM johnpapa/angular-cli as angular-app
LABEL authors="John Papa"
# Copy and install the Angular app
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN ng build --prod 

#nginx server =======================================
FROM nginx:alpine
LABEL authors="John Papa"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=angular-app /app/dist /usr/src/app
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
