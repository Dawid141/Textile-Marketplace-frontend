#!/bin/sh

# Check if jq was able to process the file and update the values
if jq --arg ip "$FRONTEND_SERVICE_URL" \
   '.ip_address = $ip' \
   /usr/src/app/public/config.json > /usr/src/app/public/config_temp.json; then
    mv /usr/src/app/public/config_temp.json /usr/src/app/public/config.json
    echo "Configuration file updated successfully."
else
    echo "Failed to update configuration file." >&2
    exit 1
fi

# Execute the CMD passed from the Dockerfile
exec "$@"
