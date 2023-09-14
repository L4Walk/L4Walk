---
title: Ubantu安装Node.js
date:   2023/6/28 21:56:29
tag:    
    - Node.js
    - Linux
    - Ubantu
categories: 
    - [Linux, Ubantu]
---

# Ubantu安装Node.js


NVM (Node Version Manager) 是一个 Bash 脚本，它允许你为每一个用户管理多个 Node.js 版本。使用 NVM，你可以随时安装或者卸载任何你想要使用或者测试的 Node.js版本。浏览[nvm](https://yq.aliyun.com/go/articleRenderRedirect?spm=a2c6h.12873639.article-detail.7.7f4c6431MG9xDI&url=https%3A%2F%2Fgithub.com%2Fnvm-sh%2Fnvm%23installing-and-updating)页面，并且拷贝下面的`curl`或者`wget`命令去下载和安装`nvm`脚本：

### 安装Node.js和npm

```bash
sudo apt update
sudo apt-get install -y nodejs
```

### 查看版本

```bash
node -v
npm -v
```

