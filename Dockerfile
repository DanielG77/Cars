# Cars/Dockerfile
FROM node:20-alpine

# Evita que Rollup intente cargar binarios nativos
ENV ROLLUP_SKIP_NATIVE=1

WORKDIR /app

# Copiamos sólo package.json y package-lock.json para aprovechar cache de capas
COPY app/package*.json ./

# Instalamos dependencias dentro de la imagen
RUN npm install

# Copiamos el resto del código
COPY app ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
