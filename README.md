# vue-multiple-application-build


  此项目适用于vue-cli3搭建的工程,用于多应用集中管理。
  方便多应用之间可以共享组件和依赖包，同步更新依赖版本。
  参考[vue-cli3移动端多应用项目模板](https://github.com/RookieHao/vue-multiple-app--template)此项目模板使用

  目录结构：

  ![20190527122233.png](https://i.loli.net/2019/05/27/5ceb660bc37b178237.png)
# usage
  修改package.json原scripts。如下：

  ![20190527121159.png](https://i.loli.net/2019/05/27/5ceb6391edd4455356.png)

# project run
  ```
  npm start [projectName]
  ```
  OR
  ```
  npm run serve [projectName]
  ```
  不声明projectName时，默认启动pages目录下第一个项目
# project build
  ```
  npm run build [projectName] [clean]
  ```
  不声明projectName时，默认打包pages目录下所有项目。

  传 clean 参数时，删除原有打包结果
# project test
``` 
  npm run test [projectName]
```

# project lint
```
  npm run lint [projectName]
```