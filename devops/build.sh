#!/bin/sh
echo "building..."

folder=$(dirname $(readlink -f $0))
base=$(dirname $folder)


if [ $BLUEMIX_BUILD ];then
	npm install -g bower
	FRONTEND=frontend
	BACKEND=backend
else
	ARCHIVE_DIR=$base/dist
	FRONTEND=$base/frontend
	BACKEND=$base/backend
fi


FRONTEND_BUILD=$FRONTEND/dist
BACKEND_BUILD=$BACKEND/dist

BACKEND_DIST=$ARCHIVE_DIR
FRONTEND_DIST=$ARCHIVE_DIR/public
LOGS_DIST=$BACKEND_DIST/logs

echo "...cleaning..."
rm -rf $DIST
echo "...building frontend..."
_pwd=`pwd`
echo "moving to ...$FRONTEND..."
cd $FRONTEND


npm install
bower install
grunt build
if [ "0" != "$?" ]; then
	echo "...frontend build failed...leaving!!!"
	cd $_pwd
	return 1
fi
echo "...building backend..."
cd $_pwd
echo "...moving to $BACKEND..."
cd $BACKEND
npm install
grunt build
if [ "0" != "$?" ]; then
	echo "...backend build failed...leaving!!!"
	cd $_pwd
	return 1
fi
cd $_pwd

echo "...merging builds..."
mkdir -p $FRONTEND_DIST
mkdir -p $LOGS_DIST

echo "...merging backend..."
cp -r $BACKEND_BUILD/* $BACKEND_DIST/

echo "...merging frontend..."
cp -r $FRONTEND_BUILD/* $FRONTEND_DIST/

echo "...done."


