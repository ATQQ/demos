export function download(url, name) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'

  xhr.onprogress = function (e) {
    const { total,loaded }= e
    const percentage = (loaded/total).toFixed(2)
    console.log('progress:', percentage);
  }
  xhr.onload = function () {
    const blob = xhr.response
    const a = document.createElement('a')
    name = name || blob.name || 'download'
    a.download = name
    a.rel = 'noopener'
    console.log(blob);
    a.href = URL.createObjectURL(blob)
    setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4) // 40s
    setTimeout(function () {
      a.dispatchEvent(new MouseEvent('click'))
    }, 0)
  }
  xhr.send()
}


