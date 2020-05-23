var mediaRate = 1
var lastMediaRate = 1
var rateMax = 5
var rateMin = 0.1
var rateInterv = 0.1


var painel = document.createElement('div')
painel.id = 'painel-wmf'

painel.innerHTML += '<button>-</button>'
painel.innerHTML += '<span>1.0</span>'
painel.innerHTML += '<button>+</button>'

document.body.insertBefore(painel, document.body.firstChild)

painel = document.getElementById('painel-wmf')



function changeRate(rate,calc=true){

  // console.log(mediaRate)
  // console.log(rate)

  lastMediaRate = mediaRate;
  
  rate = parseFloat(rate)

  if(calc){
    mediaRate = (parseFloat(mediaRate) + rate)
  }else{
    mediaRate = rate
  }

  mediaRate = mediaRate.toFixed(1)

  // console.log(mediaRate)

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

  if( (e.key == '+' || e.key == 'd') && mediaRate < rateMax){
    changeRate(rateInterv)
  }else if( (e.key == '-' || e.key == 's') && mediaRate > rateMin){
    changeRate(-rateInterv)
  }else if( !isNaN(parseInt(e.key)) && e.key < rateMax ){
    changeRate(e.key,false)
  }
  else if(e.key === 'Enter'){
    changeRate(mediaRate,calc=false)
  }
})

painel.querySelector('button:first-child').addEventListener('click', function (e){
  changeRate(-rateInterv)
})
painel.querySelector('button:last-child').addEventListener('click', function (e){
  changeRate(rateInterv)
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