#!/bin/bash

# Set variables
IMAGE_NAME="blink-client"
TAG=1.6
REGISTRY="danchoivlado"

# Build the image with the specified tag
echo "Building Docker image..."
docker build -t $REGISTRY/$IMAGE_NAME:$TAG .

# Push the specific tag
echo "Pushing Docker image with tag $TAG..."
docker push $REGISTRY/$IMAGE_NAME:$TAG

# Tag the image as 'latest'
echo "Tagging Docker image as latest..."
docker tag $REGISTRY/$IMAGE_NAME:$TAG $REGISTRY/$IMAGE_NAME:latest

# Push the 'latest' tag
echo "Pushing Docker image with tag 'latest'..."
docker push $REGISTRY/$IMAGE_NAME:latest

echo "Done! Image pushed with tags '$TAG' and 'latest'."
