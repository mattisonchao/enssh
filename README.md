<h1 align="center">Enssh</h1>

<p align="center">
 🤚🤚🏻🤚🏼🤚🏽🤚🏾
</p>
<p align="center">
  <b>Enssh is the simple and powerful ssh tools to manager your servers.</b><br>
</p>
<br>
<p align="center"><a href="README_zh_CN.md">简体中文</a></p>
<br>
<p align="center">
  <sub>(Example shows enssh)</sub>
  <img src="https://raw.githubusercontent.com/mattisonchao/enssh/master/doc/img/main.gif" alt="Enquirer Survey Prompt" width="750"><br>
</p>
<br>


## ❯ Why use enssh? 

1. You can use it to manager your all server,don't have to download any software etc.
## ❯ Getting started

- [Install](#-install)
- [Usage](#-usage)
- [About](#-about)

## ❯ Install

1. Because of enssh rely on Node.js, You need to install [Node.js](https://nodejs.org/en/) first.
```http request
https://nodejs.org/en/
```
2. Install enssh

- install with npm:

``` shell script
    npm i enssh -g
```
- install with yarn 

``` shell script
   yarn global add enssh
```
## ❯ Usage

### Add server

```shell script
enssh add <name> <user> <host>
```
|Property|Required?|Type| Description |
|---|---|---|---|
|`name`|yes|String|custom server alias|
|`user`|yes|String|remote server user|
|`host`|yes|String|remote server host|

If you do want log in everytime,you can use following options to help you:

>  -k, --keyPath  [String]
>
>  Your private ssh key path.
>
>
>  -p, --password  [String]
>
>  Save your password to config file.
>
> **Note:we do not recommend you to use this option,because we just save your password directly.**

### Show server

```shell script
enssh ls
```
### Remove server

```shell script
enssh rm  <name>
```
|Property|Required?|Type| Description |
|---|---|---|---|
|`name`|yes|String|custom server alias|
### RUN

```shell script
enssh run [mode]
```
|Property|Required?|Type| Description |
|---|---|---|---|
|name|no| LOGIN\PASSWORD\KEYFILE  |choice what connect-mode you like.|
>  -c, --cmd  [String]
>
>  Run with command

## ❯ About
### Contributing 👏

If you like enssh, star it please.

Please feel free to submit an [issue](https://github.com/mattisonchao/enssh).

Fork and [PR](https://github.com/mattisonchao/enssh/pulls) are always welcomed.