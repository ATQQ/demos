# 向页面注入js高亮图片和文字元素

## 元素位置相关
* clientX：对元素本身的度量
  * clientWidth：padding-left + padding-right + content-width
  * clientHeight：padding-top + padding-bottom + content-height
  * clientLeft：border-left-width
  * clientTop：border-top-width
* scrollX：与元素滚动有关
  * scrollHeight（readonly） - 滚动内容的总高度：content(可滚动内容) + padding（top/bottom）
  * scrollWidth(readonly) - 滚动框的宽度：clientWidth + 滚动条宽度(旧)
  * scrollLeft: 滑动条距离左侧的位置
  * scrollTop: 元素顶部到该元素可见区域的顶部（滚动条距离顶部的距离）
* offsetX：对父级的偏移量（最近的position属性不为static的祖先节点）
  * offsetWidth：clientWidth + border-width
  * offsetHeight：clientHeight + border-width
  * offsetLeft：子级border外边缘到父级padding外边缘的距离
  * offsetTop：与上同理
* getClientRects：获取的top.left,right,bottom是相对于视口top/left的距离
  * 其中right/bottom的起始计算位置分别是元素的top、left