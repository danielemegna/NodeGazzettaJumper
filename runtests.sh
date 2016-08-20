#!/bin/bash
clear

if [ -z "$1" ]
  then
    ./mocha --recursive tests
  else
    ./mocha tests --grep $1
fi
