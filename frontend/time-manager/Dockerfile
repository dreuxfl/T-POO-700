FROM node:18-alpine

COPY . /app

WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
RUN npm install
RUN npm install @vue/cli@3.2 -g

# Start app
CMD ["npm", "run", "serve"]
