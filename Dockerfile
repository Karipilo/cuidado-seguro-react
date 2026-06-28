# ─── Etapa 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Argumento para la URL del BFF (se embebe en el build de Vite)
ARG VITE_BFF_URL=ARG VITE_BFF_URL=http://bff-cuidadoseguro-1663456204.us-east-1.elb.amazonaws.com:8090/bff
ENV VITE_BFF_URL=$VITE_BFF_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ─── Etapa 2: Producción con Nginx ────────────────────────────────────────────
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Configuración nginx para React Router (SPA)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]