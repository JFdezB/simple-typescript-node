FROM node:12.16.1-alpine

# Env
ENV TIME_ZONE=Europe/Madrid

WORKDIR /usr/src/app 

#Only copy the package.json file to work directory
COPY package*.json ./

# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
# Start
RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 3000