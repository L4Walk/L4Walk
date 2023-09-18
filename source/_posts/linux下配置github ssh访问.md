---
title: Linux下配置Github SSH访问
date:   2023/6/22 18:55:02
tag:    
    - Git
    - Linux
categories: 
    - [Git]
    - [Linux]
index_img: /img/git.png
---

# linux下配置github ssh访问

### 安装git

#### Ubantu

```bash
sudo apt-get install git
```



### 生成ssh

```bash
ssh-keygen -t rsa -C "emial@address"
```

无特殊要求一路enter

### 获得ssh key

```bash
cat .ssh/id_rsa.pub
```

复制它，然后到`github settings`里` SSH and GPG keys` 里添加 `SSH key`

