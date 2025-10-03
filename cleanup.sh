#!/bin/sh
# Cleanup Azure App Service logs
rm -rf /home/LogFiles/* || true
exec "$@"
