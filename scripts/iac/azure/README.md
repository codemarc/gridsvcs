# Provisioning Azure resources using Pulumi

This folder contains the scripts used to provision the Azure resources.
I have used Pulumi to provision the resources. Pulumi is a tool that allows you to provision resources using code. It is a cloud agnostic tool that allows you to provision resources in any cloud provider.

## Prerequisites

While there are many ways to install Pulumi, I have used the homebrew package manager to install Pulumi and any other must have dependencies.

while beyond the scope of this project, to install homebrew on your system, you can follow the instructions [here](https://brew.sh/).

### homebrew updates and installs 

* brew update && brew upgrade
* node - brew update && brew upgrade node
* pulumi -  brew update && brew upgrade pulumi
* azure cli -  brew update && brew upgrade azure-cli

#### check versions

prereq         | version  | cmd
---------------|----------|------
homebrew       | 4.4.0-91 | brew -v
node           | v12.12.0 | node -v
pulumi         | v3.135.1 | pulumi version
azure client   | 2.64.0   | az version | jq '.["azure-cli"]'








#### authenticate to azure

az login 

No   |Subscription name  |Subscription ID                     |Tenant
-----|-------------------|------------------------------------|-----------------------------------
[1] *|braintrailz-1      |54e493b7-8eaf-4434-9742-94b4f3649ba7|braintrailz.com


##### List locations
```bash
# all
az account list-locations --output table

# US
az account list-locations --output json | jq -r '.[] | select(.metadata.geographyGroup == "US") | .displayName'

```