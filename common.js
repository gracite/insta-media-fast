var mediaRate = 1;
var lastMediaRate = 1;


var painel = document.createElement('div')
painel.id = 'painel-wmf'

painel.innerHTML += '<button>-</button>'
painel.innerHTML += '<span>1.0</span>'
painel.innerHTML += '<button>+</button>'

document.body.insertBefore(painel, document.body.firstChild)

painel = document.getElementById('painel-wmf')



function changeRate(rate,calc=true){

  console.log(mediaRate)
  console.log(rate)

  lastMediaRate = mediaRate;

  if(calc){
    mediaRate = (parseFloat(mediaRate) + rate).toFixed(1)
  }else{
    mediaRate = rate
  }

  console.log(mediaRate)

  painel.querySelector('span').innerText = mediaRate
  
  if(document.querySelector('video')){
    document.querySelector('video').playbackRate = mediaRate
  }
  
}


//console.log(chrome.cookies.getAll())
//https://developer.chrome.com/extensions/cookies#method-get

// if(getCookie('mediaRate')){
//   mediaRate = parseFloat( getCookie('mediaRate') )
//   console.log('tem')
// }else{
//   setCookie('mediaRate',1,99)
//   mediaRate = 1
//   console.log('não tem')
// }

// changeRate( mediaRate, false)



document.addEventListener('keypress', function (e){

  if(e.key == '+' && mediaRate < 5){
    changeRate(0.1)
  }else if(e.key == '-' && mediaRate > 0.1){
    changeRate(-0.1)
  }else if( !isNaN(parseInt(e.key)) ){
    changeRate(e.key,false)
  }
  else if(e.key === 'Enter'){
    changeRate(mediaRate,calc=false)
  }
})

painel.querySelector('button:first-child').addEventListener('click', function (e){
  changeRate(-0.1)
})
painel.querySelector('button:last-child').addEventListener('click', function (e){
  changeRate(0.1)
})


function checkRate(){

  setTimeout(()=>{

    if(mediaRate != 1){ //lastMediaRate != mediaRate && 
      changeRate(mediaRate, calc=false)
    }
    checkRate()
  },1000)

}
checkRate()