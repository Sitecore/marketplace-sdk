#!/bin/bash

result=$(pnpx turbo run build --affected --dry-run=json)

packages=$(echo "$result" | jq -r '.tasks[].directory' | grep '^packages/' | sed 's|^|./|')

if [ -n "$packages" ]; then
  echo "Packages to publish: $packages"
  echo "Running: pnpx pkg-pr-new@0.0.54 publish --pnpm $packages"
  
  # Add timeout and retry logic for the publish command
  timeout 300 pnpx pkg-pr-new@0.0.54 publish --pnpm $packages || {
    echo "Publish command failed or timed out"
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo "PNPM version: $(pnpm --version)"
    exit 1
  }
fi
