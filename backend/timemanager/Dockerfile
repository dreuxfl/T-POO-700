FROM elixir:latest

COPY . .


RUN export MIX_ENV=prod && \
    rm -Rf _build && \
    apt-get update && \
    apt-get install -y postgresql-client && \
    apt-get install -y inotify-tools && \
    apt-get install -y nodejs && \
    curl -L https://npmjs.org/install.sh | sh && \
    mix local.hex --force && \
    mix local.rebar --force && \
    mix deps.get && \
    mix release && \
    mix archive.install hex phx_new 1.6.14 --force
    



CMD ["mix", "ecto.setup"]
CMD ["mix", "phx.server"]