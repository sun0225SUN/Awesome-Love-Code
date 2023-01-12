module.exports = {
  plugins: () => {
    return [
      require('postcss-nested')(), // 用于解开 @media, @supports, @font-face 和 @document 等css规则
      require('pixrem')(), // 为 rem 单位添加像素转化
      require('autoprefixer')({ // 添加内核前缀
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
      }),
      require('postcss-flexibility')(), // 添加 flex 布局 polyfill
      require('postcss-discard-duplicates')() // 去除css中的重复规则
    ]
  }
}