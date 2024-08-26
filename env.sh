#!/bin/sh
ENV_FILE=".env"
TARGET="./public/envConfig.js"

# you can put all your stuff to .env.local, which is ignored in git
if [ -f ".env.local" ]
then
    ENV_FILE=".env.local"
fi

if [ "$2" ]
then
    ENV_FILE=$1

    if [ -f "${ENV_FILE}.local" ]
    then
        ENV_FILE="${ENV_FILE}.local"
    fi

    TARGET=$2
fi

if [ -f "build/versionInfo.json" ]
then
    cp "build/versionInfo.json" "public/"
fi

# line endings must be \n, not \r\n !
echo "window._env_ = {" > ${TARGET}

# correctly handles "=" signs in values
awk -F '=' '{ st = index($0, "="); print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : substr($0, st+1)) "\"," }' ${ENV_FILE} >> ${TARGET}

echo "}" >> ${TARGET}
