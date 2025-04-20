#!/bin/sh

if ps aux | grep -q [b]yteframe.js; then
  echo "ERROR: node-byteframe already running!"
else
  cd ~/node-byteframe
  if [ -d /mnt/d/Work/node-byteframe ]; then
    cp -v /mnt/d/Work/node-byteframe/byteframe.js byteframe.js
  else
    ps aux | grep -q [s]shd || sshd
  fi
  node --inspect=$(ip route get 1.1.1.1 | grep -oP 'src \K\S+'):9229 byteframe.js
fi