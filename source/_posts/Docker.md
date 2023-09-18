---
title:  Docker命令速查
date:   2023/6/22 9:12:37
tags:   常用命令
categories: Docker
index_img: /img/docker.jpg
---

# Docker

### docker常用命令

```bash
docker build -t imagename Dockerfilepath # 镜像打包
docker save -o imagename.tar imagename:latest #镜像储存
docker login address #登录镜像仓库
docker tag imagename:latest address/floder/name #镜像打标签
docker push address/floder/imagename:latest #上传镜像

 docker ps #查看所有正在运行容器
 docker stop containerId #containerId 是容器的ID

 docker ps -a #查看所有容器
 docker ps -a -q #查看所有容器ID

 docker start $(docker ps -a -q) #tart启动所有停止的容器
 docker stop $(docker ps -a -q) #stop停止所有容器
 docker rm $(docker ps -a -q) #remove删除所有容器
```

#### docker修改镜像名称

```bash
docker tag ID NAME
```

