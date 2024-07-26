#!/bin/bash
export namesp="gridsvcs"
source ../_prescript.sh
set -e

# secrets
kubectl get secret apikeys  -o yaml >secret-apikeys.yaml
kubectl get secret codemarc -o yaml >secret-codemarc.yaml

# deployments
kubectl get deployment motd -o yaml >deployment-motd.yaml
