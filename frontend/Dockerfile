# Use the official Nginx image
FROM nginx:alpine

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy your static files from the public folder to Nginx's web root
COPY public/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
