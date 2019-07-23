FROM node:lts

# Create app directory
WORKDIR /ngx-fomantic-workdir

COPY . .

WORKDIR /ngx-fomantic/projects/

# Install all of the dependencies
RUN npm install

# Build the project & compile assets
RUN npm run build:lib:prod

EXPOSE 4200

# Serve the documentation site
CMD ["npm", "run", "docker:serve:docs"]
