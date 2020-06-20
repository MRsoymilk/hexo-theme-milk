# 主题：hexo-theme-milk

## 预览

![overview](README/overview.jpg)

![article](README/article.jpg)

## 使用

**进入hexo目录**

1. 下载主题

```bash
git clone https://github.com/MRsoymilk/hexo-theme-milk.git themes/milk
```

2. 主题依赖

主题使用`scss`

```bash
npm install hexo-renderer-scss
```

3. 切换主题

修改`_config.yml`

```yaml
theme: milk
```

4. 主题高亮

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
  tab_replace: ''
  wrap: true
  hljs: false
```