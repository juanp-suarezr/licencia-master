# Etapa 1: Construcción del proyecto
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Servidor Apache para servir archivos estáticos
FROM httpd:2.4-alpine

# Crear carpeta de sitio
RUN mkdir -p /usr/local/apache2/htdocs

# Copiar archivos estáticos desde la etapa de build
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Habilitar módulo de reescritura
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copiar configuración personalizada
COPY ./docker/apache/vue.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
