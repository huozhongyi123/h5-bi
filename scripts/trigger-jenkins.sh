#!/usr/bin/env bash
# Usage:
#  ./trigger-jenkins [<branch>=master]
#  @TODO jenkins can't support other branch now.
#  联系 jenkins 管理员修改配置

branch=master
if [[ $1 ]]; then
  branch=$1
fi
source .env

echo $branch

curl -X POST $JENKINS_URL/job/warehouse_qa/buildWithParameters?branch=$branch \
  -u $JENKINS_USER:$JENKINS_TOKEN \
  -v 

echo "$JENKINS_URL/job/warehouse_qa/"
