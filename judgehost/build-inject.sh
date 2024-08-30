#!/bin/sh -eu
# before build inject, build judgehost
docker_tag="tommyjqliu/judgehost:latest"
docker build -t "${docker_tag}" -f judgehost/Dockerfile.inject.new .
