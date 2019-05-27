FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 5000

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["RemindersManager.IdentityServer/RemindersManager.IdentityServer.csproj", "RemindersManager.IdentityServer/"]
RUN dotnet restore "RemindersManager.IdentityServer/RemindersManager.IdentityServer.csproj"
COPY . .
WORKDIR "/src/RemindersManager.IdentityServer"
RUN dotnet build "RemindersManager.IdentityServer.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "RemindersManager.IdentityServer.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "RemindersManager.IdentityServer.dll"]