import './style.scss'
import dom2Img from 'dom-to-image'
import { saveAs } from 'file-saver'
import './vue'
import './react'

const $post = document.querySelector('#post')
const $down = document.querySelector('#download')
const $preview = document.querySelector('#preview')
const $close = document.querySelector('#close')
const $imgWrapper = document.querySelector('#img-wrapper') as HTMLDivElement
const $img = document.querySelector('#img')as HTMLImageElement

$down.addEventListener('click',function(e){
    dom2Img.toBlob($post).then(blob=>{
        saveAs(blob,'test.png')
    })
})

$preview.addEventListener('click',function(e){
    dom2Img.toBlob($post).then(blob=>{
        const url = URL.createObjectURL(blob)
        $img.src = url
        $imgWrapper.style.display = 'block'
        // saveAs(blob,'test.png')
    })
})

$close.addEventListener('click',function(){
    $imgWrapper.style.display = 'none'
})