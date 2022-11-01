FROM elixir:latest

# Install debian packages
RUN apt-get update && \
    apt-get install --yes build-essential inotify-tools postgresql-client git && \
    apt-get clean

COPY . /app

WORKDIR /app

# Install Phoenix packages
RUN mix local.hex --force && \
    mix archive.install --force hex phx_new

RUN mix deps.get

EXPOSE 4000

# Execute entrypoints
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Start app
CMD ["mix", "phx.server"]
