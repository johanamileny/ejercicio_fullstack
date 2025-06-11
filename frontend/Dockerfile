FROM node:22.14.0-slim

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos de mi proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

EXPOSE 5136

# Comando para iniciar la aplicación
CMD ["npm", "start"]