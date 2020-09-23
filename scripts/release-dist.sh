#!/usr/bin/env bash
# Usage:
#  ./release-dist                  编译 production 环境并且推送到 master 分支上。
#  ./release-dist tag              编译 production 环境并且推送到 master 分支上，同时打上对应的 tag 并推送。
#  ./release-dist test             编译 test 环境并且推送到 test 分支上。
#  ./release-dist pre-release      编译 test 环境并且推送到 pre-release 分支上。

NODE_ENV=production
BRANCH=master
VERSION=`cat package.json | json 'version'`
COMMIT_ID=`git log --pretty=format:'%h' -n 1`
COMMIT_MESSAGE=`git log -1 --pretty=%B`

if [[ $1 == "test" ]]; then
  BRANCH=test
  NODE_ENV=test
fi

if [[ $1 == "pre-release" ]]; then
  BRANCH=pre-release
  NODE_ENV=production
  echo 'API_ROOT=https://wms-pre.nicetuan.net/tms' >> .env.production.local
fi

rm -rf dist
git clone --single-branch --branch $BRANCH http://gitlaball.nicetuan.net/fe/h5-bi-dist.git dist
find ./dist -maxdepth 1 -not -name '.git' -not -name 'dist' | xargs rm -rf

NODE_ENV=$NODE_ENV yarn build
cp -rf out/* dist/

if [[ $1 == "pre-release" ]]; then
  rm -rf .env.production.local
fi

# goto dist and git operation
cd dist
git add -A
COMMIT_MESSAGE+=$'\n\n'"release from commit: $COMMIT_ID, version: $VERSION"
if [[ $1 == "tag" ]]; then
  COMMIT_MESSAGE+=", with tag $VERSION"
fi
git commit -m "$COMMIT_MESSAGE"
git push origin $BRANCH
if [[ $1 == "tag" ]]; then
  git tag v$VERSION
  git push origin --tags
fi
cd -

echo ""
echo ""
echo "visit: http://gitlaball.nicetuan.net/fe/h5-bi-dist/commits/$BRANCH"
echo ""
echo ""
