FROM nginx:1.15.2-alpine
LABEL build="frontend"

RUN rm -rf /etc/nginx/conf.d
COPY conf.d /etc/nginx/conf.d

# Static build
COPY build /usr/share/nginx/html/
COPY env.sh /tmp/
COPY .env* /tmp/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

# Add bash
#RUN apk add --no-cache bash

# Start Nginx server
CMD ["/bin/sh", "-c", "chmod +x /tmp/env.sh && /tmp/env.sh /tmp/.env /usr/share/nginx/html/envConfig.js && nginx -g \"daemon off;\""]
