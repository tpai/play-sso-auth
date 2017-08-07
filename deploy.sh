#!/usr/bin/env bash

NODE_ENV=production node index.js & \
NODE_ENV=development node index.js
