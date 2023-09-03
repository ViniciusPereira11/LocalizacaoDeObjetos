//matrix de objetos vazia
objetos = [];
//cria variável stt com valor falso
sst = false;
function preload(){

}
function setup(){
    canvas  = createCanvas(640, 480);
    canvas.position(windowWidth/2 - 320, 390);
    background("black");
    video = createCapture(VIDEO);
    video.hide();
    video.size(640, 480);
}
function draw(){
    image(video, 0, 0, 640, 480);
    //checa se sst é verdadeiro
    if(sst==true){
         //se sim, faz o robo detectar
            robozinho.detect(video, gotResult);
       //for para repetir pelo números de objetos
        for(var i = 0; i < objetos.length;i++){
          
            //coloca no site: objetos detectados
            document.getElementById("status").innerHTML = "objetos detectados";
         //colocar o txto e o retângulo no objeto
            document.getElementById("objeto").innerHTML = objetos.length;
            fill("red");
            p = floor(objetos[i].confidence * 100);
            text(objetos[i].label + "" + p + "%", objetos[i].x, objetos[i].y);
                noFill();
                stroke("lime");
                rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
           //Se o objeto detectado for igual ao texto que a pessoa digitou
           if(objetos[i].label == nome){
                //mostra o nome do objeto detectado
                document.getElementById("status").innerHTML = nome + " " + "detected";
                //API window.speechSynthesis
                synth = window.speechSynthesis;
                //transformar texto em áudio
                utterThis = new SpeechSynthesisUtterance(nome + "detected");
                //executa o áudio
                synth.speak(utterThis);
           } else{
             //mostra que não achou o objeto
             document.getElementById("status").innerHTML = "object" + " " + "not" + " " + "found";
           }
        

         
        }
     
    }
   

   
}
var input;
function iniciar(){
    //robozinho do ml5 objeto detector cocossd
    robozinho = ml5.objectDetector("cocossd", modelLoaded);
    
    //coloca o texto no site: Detectando objetos
   document.getElementById("status").innerHTML = "detectando objetos...";
    //guarda na variável o nome do objeto
    nome = document.getElementById("nome").value;
    //que a pessoas escreveu no input
}
function modelLoaded(){
     //console.log
     console.log("Robôzinho está pronto!");
        //variável sst é verdadeira
     sst = true;
}
function gotResult(erro, result){
    //se erro, mostra erro
    if(erro){
        console.log(erro);
    }else{
       //se result, mostra result
         console.log(result);
         //guarda o result na lista de objetos
         objetos = result;
    }
    
    
   
}