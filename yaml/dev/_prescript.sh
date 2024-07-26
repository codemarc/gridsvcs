#!/bin/bash
estate="local"
context=$(kubectl config current-context)

echo Context is set to $context
echo
if [ ! "$context" = "$estate" ]; then
  echo Context is not set to "$estate"
  kubectl config use-context "$estate"
  echo
  read -p "Press enter to retry..."
  echo $0
  $0
fi
kubectl create namespace $namesp 2>/dev/null
kubectl config set-context --current --namespace=$namesp
