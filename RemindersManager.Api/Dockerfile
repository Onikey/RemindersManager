FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 5001
EXPOSE 45001

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["RemindersManager.API/RemindersManager.Api.csproj", "RemindersManager.API/"]
RUN dotnet restore "RemindersManager.API/RemindersManager.Api.csproj"
COPY . .
WORKDIR "/src/RemindersManager.API"
RUN dotnet build "RemindersManager.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "RemindersManager.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "RemindersManager.Api.dll"]