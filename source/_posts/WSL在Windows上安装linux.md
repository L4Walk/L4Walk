---
title: Windows通过Wsl2安装Linux
date:   2023/6/22 19:23:41
tag:    
    - Linux
    - Ubantu
    - WSL2
categories: 
    - [Linux, WSL]
index_img: /img/wsl2.png
---

# WSL在Windows上安装linux

### 官方地址

[安装 WSL | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/install)

### 安装指定版本的Linux发行版

```bash
#查看可用的Linux发行版
wsl --list --online 或 wsl -l -o
#安装指定发行版
wsl --install -d <Distribution Name>
```

