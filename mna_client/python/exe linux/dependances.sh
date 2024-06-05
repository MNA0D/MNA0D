#!/bin/bash

# Vérifier et installer scrot
if ! command -v scrot &> /dev/null
then
    echo "scrot could not be found. Installing scrot..."
    if [ -x "$(command -v apt-get)" ]; then
        sudo apt-get install -y scrot
    elif [ -x "$(command -v pacman)" ]; then
        sudo pacman -S scrot
    elif [ -x "$(command -v yum)" ]; then
        sudo yum install -y scrot
    else
        echo "Could not find a package manager to install scrot. Please install it manually."
        exit 1
    fi
fi

echo "Installation complete. You can now run the executable."

#chmod +x install.sh
