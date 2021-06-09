import { saveAs } from 'file-saver'
import { download } from './myDownload'
// 资源链接
const url = 'https://img.cdn.sugarat.top/mdImg/MTYyMzIxNzE1NTUyNg==623217155526'
document.getElementById('pic').src = url
document.getElementById('btn').addEventListener('click', function () {
  saveAs(url)
})

document.getElementById('btn2').addEventListener('click', function () {
  download(url)
})