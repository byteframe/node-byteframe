#!/bin/sh

if ps aux | grep -q [b]yteframe.js | grep -v grep; then
  echo "ERROR: node-byteframe already running!"
else
  [ ! -d ~/node-byteframe ] && mkdir ~/node-byteframe
  cd ~/node-byteframe
  if [ -d /mnt/d/Work/node-byteframe ]; then
    cp -v /mnt/d/Work/node-byteframe/byteframe.js byteframe.js
    [ ! -d fortunes ] && ln -sv /mnt/d/Work/node-byteframe/fortunes
    [ ! -d images ] && ln -sv /mnt/d/Work/node-byteframe/images
    [ ! -d rivescript ] && ln -sv /mnt/d/Work/node-byteframe/rivescript
    [ ! -d text ] && ln -sv /mnt/d/Work/node-byteframe/text
    [ ! -e data.json ] && ln -sv /mnt/d/Work/node-byteframe/data.json
  else
    ps aux | grep -q [s]shd || sshd
  fi
  node --inspect=$(ip route get 1.1.1.1 | grep -oP 'src \K\S+'):9229 byteframe.js
fi
