# Etapa Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Directorio de trabajo
WORKDIR /app

# Copiar el archivo de proyecto y restaurar dependencias
COPY . .

RUN dotnet restore

# Instalar dotnet-ef para ejecutar migraciones
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Ejecutar las migraciones de la base de datos
RUN dotnet ef database update

RUN dotnet publish -c Release -o out

# Etapa Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Directorio de trabajo
WORKDIR /app

# Copiar los archivos publicados desde la etapa de build
COPY --from=build /app/out .

# Exponer el puerto del backend
EXPOSE 5207

# Establecer la variable de entorno para que ASP.NET Core escuche en el puerto correcto
ENV ASPNETCORE_URLS=http://+:5207

# Comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "Backend.dll"]
