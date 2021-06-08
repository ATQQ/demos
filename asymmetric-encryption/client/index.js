import $http from './http'
const $send = document.getElementById('send')
const $receive = document.getElementById('receive')

$send.addEventListener('click',function(){
    $http.post('/test/demo',{
        name:'xm',
        age:~~(Math.random()*1000)
    }).then((res)=>[
        updateReceive(res)
    ])
})

function updateReceive(data){
    $receive.value = data instanceof Object?JSON.stringify(data):data
}