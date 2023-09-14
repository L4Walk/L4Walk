---
title:  Git命令速查
date:   2023/6/22 21:55:59
tags:   
    - 常用命令
    - Git
categories: Git
---

# Git

## Git安装配置

```bash
git config --global user.name "L4Walk-wsl2-ubuntu"
git config --global user.email l4walk@chuheng.tech
git config --global init.defaultBranch main
```



### 问题排查

##### error: remote origin already exists.
error: src refspec main does not match any

```bash
# 删除关联
git remote rm origin
# 新建关联
git remote add origin <git remote url>
# push
git push origin main
```

