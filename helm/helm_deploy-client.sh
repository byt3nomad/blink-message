#!/bin/bash

# Variables
HELM_RELEASE_NAME="client"
HELM_CHART_PATH="./client"       

# Perform the upgrade
echo "Upgrading Helm release: $HELM_RELEASE_NAME"
helm upgrade $HELM_RELEASE_NAME $HELM_CHART_PATH
