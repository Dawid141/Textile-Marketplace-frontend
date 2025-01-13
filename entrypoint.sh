#!/bin/sh

# Check if FRONTEND_SERVICE_URL is set
if [ -z "$FRONTEND_SERVICE_URL" ]; then
    echo "Error: FRONTEND_SERVICE_URL is not set." >&2
    exit 1
fi

# Verify jq is installed
jq --version || { echo "Error: jq is not installed."; exit 1; }

# Check if the configuration file exists
if [ ! -f /usr/src/app/public/config.json ]; then
    echo "Error: /usr/src/app/public/config.json does not exist." >&2
    exit 1
fi

# Attempt to update the configuration file
if jq --arg ip "$FRONTEND_SERVICE_URL" \
   '.ip_address = $ip' \
   /usr/src/app/public/config.json > /usr/src/app/public/config_temp.json; then
    # Move the temporary file to overwrite the original configuration
    mv /usr/src/app/public/config_temp.json /usr/src/app/public/config.json || {
        echo "Error: Failed to move updated configuration file." >&2
        exit 1
    }
    echo "Configuration file updated successfully."
else
    echo "Failed to update configuration file." >&2
    exit 1
fi

# Execute the CMD passed from the Dockerfile
exec "$@"
