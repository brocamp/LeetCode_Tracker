#!/bin/bash

# Check if user has root/sudo access
if [[ $(id -u) -ne 0 ]]; then
  echo "This script must be run as root or with sudo."
  exit 1
fi

# Check user's operating system
os=$(uname -s)
case $os in
  Linux)
    # Install required packages using package manager
    if command -v apt-get &> /dev/null; then
      echo "Installing packages using apt-get..."
      apt-get update
      echo "Installing latest version of docker..."
      curl -fsSL https://get.docker.com -o get-docker.sh
      sh get-docker.sh
      apt install docker-compose
      echo "Packages installed successfully."
      sudo apt-get update
      sudo apt-get install -y ca-certificates curl gnupg
      sudo mkdir -p /etc/apt/keyrings
      curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
      NODE_MAJOR=20
      echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
      sudo apt-get update
      sudo apt-get install nodejs -y
    else
      echo "Unsupported package manager."
      exit 1
    fi
    ;;
  *)
    echo "Unsupported operating system."
    exit 1
    ;;
esac

Clone Git repo and run Docker Compose
echo "Cloning Git repo..."
git clone https://github.com/brocamp/LeetCode_Tracker