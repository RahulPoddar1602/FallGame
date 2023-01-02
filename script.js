var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var leftcounter = Math.pow(1.03,counter) 
var runner =leftcounter;
var topcounter = 0.8*Math.pow(1.01,counter)
function moveLeft(){
    var left = parseFloat(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0)
    character.style.left = left - 1.5*runner + "px";
}
// function moveFastLeft(){
//     var left = parseFloat(window.getComputedStyle(character).getPropertyValue("left"));
//     if(left>0)
//     character.style.left = left - 1.5*runner + "px";
// }
function moveRight(){
    var left = parseFloat(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380)
    character.style.left = left + 1.5*runner + "px";
}
// function moveFastRight(){
//     var left = parseFloat(window.getComputedStyle(character).getPropertyValue("left"));
//     if(left<380)
//     character.style.left = left + 1.5*runner + "px";
// }   
// document.addEventListener("keydown", event => {
//     if(event.key==="Shift")
//     runner=1.5*leftcounter;
//     else
//     runner=leftcounter;
// })
document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key==="ArrowLeft" ){
            interval = setInterval(moveLeft, 1);
        }
        // if(event.key==="a" ){
        //     interval = setInterval(moveFastLeft, 1);
        // }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
        // if(event.key==="d"){
        //     interval = setInterval(moveFastRight, 1);
        // }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0 ){
        alert("Game over. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        // if(0.2*Math.pow(1.1,counter)<1)
        // {
        //     iblock.style.top = iblockTop - 0.2*Math.pow(1.1,counter) + "px";
        //     ihole.style.top = iblockTop - 0.2*Math.pow(1.1,counter)  + "px";
        // }
        // else
        // {
        //     iblock.style.top = iblockTop - 1 + "px";
        //     ihole.style.top = iblockTop - 1  + "px";
        // }
        iblock.style.top = iblockTop - topcounter + "px";
        ihole.style.top = iblockTop - topcounter  + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+80>=characterLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + leftcounter + "px";
        }
    }else{
        character.style.top = characterTop - topcounter + "px";
    }
},1);