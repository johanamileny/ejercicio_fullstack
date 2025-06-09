
### 🐳 `backend/docker-compose.yml`

```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:8080"
    networks:
      - backend-network
    environment:
      ASPNETCORE_ENVIRONMENT: Development

networks:
  backend-network:
    driver: bridge
```

📍 Esto deja la API escuchando en `http://localhost:5000`.

---

### 💻 `frontend/docker-compose.yml`


```yaml
version: '3.8'

services:
  remix:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    networks:
      - frontend-network

networks:
  frontend-network:
    driver: bridge
```

📍 Accedés a la web en `http://localhost:3000`.

---

## 📦 `/backend/Dockerfile`

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TuProyecto.dll"]
```

---

## 🔥 `/backend/.dockerignore`

```
bin/
obj/
.vscode/
*.user
*.suo
*.csproj.user
```

---

## 💻 `/frontend/Dockerfile`

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

---

## 🚫 `/frontend/.dockerignore`

```
node_modules
.vscode
.env
build
.cache
```


---

### 4. Levantar todo con Docker Compose

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

- Accedés a tu backend en: [http://localhost:5000](http://localhost:5000/)
    
- Y al frontend Remix en: [http://localhost:3000](http://localhost:3000/)