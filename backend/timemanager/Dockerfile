
# syntax=docker/dockerfile:1

FROM elixir:latest

RUN mkdir /app	

COPY . /app

# Install debian packages
RUN apt-get update && \
    apt-get install --yes build-essential inotify-tools postgresql-client git && \
    apt-get clean

WORKDIR /app

# Install Phoenix packages
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix archive.install --force hex phx_new 1.5.1	

RUN mix deps.get
RUN mix do compile, release

EXPOSE 4000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
