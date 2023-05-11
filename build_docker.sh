#!/usr/bin/env bash

JWT_SECRET=${JWT_SECRET:-secret}

docker build . -t review-site:latest --build-arg jwt_secret=${JWT_SECRET}