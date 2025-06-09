FROM node:20

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos de mi proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]