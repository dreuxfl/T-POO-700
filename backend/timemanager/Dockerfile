# syntax=docker/dockerfile:1

FROM elixir:latest



# Install debian packages
RUN apt-get update && \
    apt-get install --yes build-essential inotify-tools postgresql-client git && \
    apt-get clean
	
# Install Phoenix packages
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix archive.install --force hex phx_new 1.5.1
	
CMD ["mix", "ecto.create"]
CMD ["mix", "ecto.migrate"]

# Install node
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs	
WORKDIR /usr/src/app
COPY . .

RUN mix deps.get
RUN npm install 

EXPOSE 4000

CMD ["mix", "phx.server"]