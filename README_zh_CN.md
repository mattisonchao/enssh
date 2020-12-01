<h1 align="center">Enssh</h1>

<p align="center">
 🤚🤚🏻🤚🏼🤚🏽🤚🏾
</p>
<p align="center">
  <b>Enssh是用于管理服务器的简单而强大的ssh工具。</b><br>
</p>

<br>
<p align="center"><a href="README.md">English</a></p>
<br>
<p align="center">
  <sub>(enssh示例)</sub>
  <img src="https://raw.githubusercontent.com/mattisonchao/enssh/master/doc/img/main.gif" alt="Enquirer Survey Prompt" width="750"><br>
</p>

<br>


## ❯ 为什么要用enssh? 

1. 可以使用它来管理所有服务器，而不用下载任何软件或其他东西。
## ❯ 入门

- [安装](##-安装)
- [用法](#-用法)
- [关于](#-关于)

## ❯ 安装

1. 因为enssh依赖于Nodejs，所以你首先应该安装[Nodejs](https://nodejs.org/en/) 
```http request
https://nodejs.org/en/
```
2. 安装enssh

- 使用npm安装:

``` shell script
    npm i enssh -g
```
- 使用yarn安装 

``` shell script
   yarn global add enssh
```
## ❯ 用法

### 添加服务器

```shell script
enssh add <name> <user> <host>
```
|属性|是否必要|类型| 描述 |
|---|---|---|---|
|`name`|yes|String|定制服务器别名|
|`user`|yes|String|远程服务器用户名|
|`host`|yes|String|远程服务器主机|

如果你想要每次都登录，则可以使用下列选项：

>  -k, --keyPath  [String]
>
>  你的ssh私钥路径
>
>
>  -p, --password  [String]
>
>  在配置文件中保存你的密码
>
>  注意：我们不建议您使用此选项，因为我们只是直接保存您的密码。
>
>  注意：我们不建议使用此选项，因为我们只是保存你的明文密码。

### 显示服务器

```shell script
enssh ls
```
### 删除服务器

```shell script
enssh rm  <name>
```
|属性|是否必要|类型| 描述 |
|---|---|---|---|
|`name`|是|String|定制服务器别名|
### 运行

```shell script
enssh run [mode]
```
|Property|是否必要|类型| 描述 |
|---|---|---|---|
|name|否| LOGIN\PASSWORD\KEYFILE  |选择你喜欢的连接方式|
>  -c, --cmd  [String]
>
>  Run with command

## ❯ 关于
### Contributing 👏

如果你喜欢enssh，别忘了点一个star

请随时提交[问题](https://github.com/mattisonchao/enssh)

始终欢迎Fork和[PR](https://github.com/mattisonchao/enssh/pulls)