FROM node:current-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN npm install --production
COPY . .

# EXPOSE 3000
CMD ["npm", "run", "start"]