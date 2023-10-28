FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build --configuration=production
FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
