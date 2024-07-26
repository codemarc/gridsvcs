#!/bin/bash
export namesp="gridsvcs"
source ../_prescript.sh
set -e

export kinds="secret-apikeys;secret-codemarc;deployment-motd"

for kind in $kinds; do
  echo kubectl create -f $kind.yaml
  kubectl create -f $kind.yaml
done
