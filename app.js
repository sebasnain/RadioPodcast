let audio = document.getElementById('mi_audio');
let icono = document.getElementById('icono');
let volumeControl = document.getElementById('volume_control');


//cambiar el estado del boton 
let estado = false;
document.getElementById('play_pausa').addEventListener('click' , function(){
    estado = !estado ; //conmuta el estado entre true y false
      if(estado){
        audio.play()
        icono.className = "fa fa-pause-circle";
    } else {
        audio.pause()
        icono.className = "fa fa-play-circle";
    }
})

document.getElementById('stop').addEventListener('click' , function(){
    audio.pause();
    audio.currentTime = 0;
    //setear el estado 
    estado = false;
    icono.className = "fa fa-play-circle";
})

//----------------------


let duracionAudio = 0;
let monitoreoAudio = 0;
let porcentajeDeReproduccion = 0;


audio.addEventListener('loadedmetadata' , function(){
 //console.log('la duracion es de ' + audio.duration + 'segundos')   //obtenemos el dato de la duracion 
  duracionAudio = audio.duration;
  actualizarTextoDuracion(duracionAudio)

})

audio.addEventListener('timeupdate' , function(){
    monitoreoAudio = audio.currentTime;
   // console.log('la duracion es de ' + audio.currentTime + 'segundos') // obtenemos el dato de cuanto se va reproduciendo 
     // Calcula el porcentaje de reproducción
     if (duracionAudio > 0) {
        porcentajeDeReproduccion = (monitoreoAudio / duracionAudio) * 100;
        //console.log('Porcentaje de reproducción: ' + porcentajeDeReproduccion.toFixed(2) + '%');
        cambiarBarra(porcentajeDeReproduccion)
        actualizarTextoTiempoReproduccion(monitoreoAudio)
    }
  })

  //esto es para ir tranformando un texto segun la duracion
  function actualizarTextoDuracion(duracion) {
    let textoDuracion = document.getElementById('duracionText');
    const minutos = Math.floor(duracion / 60);
    const segundosRestantes = Math.floor(duracion % 60);
    
    textoDuracion.textContent = minutos.toString().padStart(2, '0') + ':' + segundosRestantes.toString().padStart(2, '0');
}

function actualizarTextoTiempoReproduccion(tiempo) {
  let textoTiempoReproduccion = document.getElementById('minutos_de_reproduccion');
  const minutos = Math.floor(tiempo / 60);
  const segundosRestantes = Math.floor(tiempo % 60);
  textoTiempoReproduccion.textContent = minutos.toString().padStart(2, '0') + ':' + segundosRestantes.toString().padStart(2, '0');
}








//logica de la  animacion de barra
function cambiarBarra(numero){
  let barra = document.getElementsByClassName('barraCargada')[0];
barra.style.width = numero + '%'
 }


//control del volumen 
volumeControl.addEventListener('input', function() {
  audio.volume = volumeControl.value;
});
