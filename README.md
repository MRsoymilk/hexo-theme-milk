# 主题：hexo-theme-milk

## 预览

![overview](https://s3.ax1x.com/2021/01/04/sCd1yt.png)

![article](https://s3.ax1x.com/2021/01/04/sCdZdO.png)

## 使用

详情参考[hexo-theme-milk wiki](https://github.com/MRsoymilk/hexo-theme-milk/wiki)

**进入 hexo 目录**

1. 下载主题

```bash
git clone https://github.com/MRsoymilk/hexo-theme-milk.git themes/milk
```

2. 切换主题

修改`_config.yml`

```yaml
theme: milk
```

3. 代码高亮

默认使用[highlight.js](https://highlightjs.org/)的`monokai-sublime`主题。自定义设置请下载相应代码并放置在`themes/milk/source/lib/highlight/`目录中。

使用自定义主题，修改`themes/milk/_config.yml`

```yaml
highlight: monokai-sublime
```

使用自定义高亮需要关闭`Hexo`默认高亮，修改`_config.yml`

```yaml
highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace: ""
  wrap: true
  hljs: false
```

