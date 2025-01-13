FROM node:alpine

WORKDIR /usr/src/app

# Copy all files, including entrypoint.sh
COPY . /usr/src/app

# Install required packages and dependencies
RUN apk add --no-cache jq
RUN npm install -g @angular/cli
RUN npm install

# Set permissions for entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh
# Echo current file structure of /usr/src/app
RUN echo "Current file structure of /usr/src/app:" && ls -l /usr/src/app

# Use entrypoint.sh as the entry point for the container
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# Default command to serve the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]
