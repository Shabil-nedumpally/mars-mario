var winmusic
winmusic = new Audio("mixkit-slot-machine-win-1928.mp3")
var losemusic = new Audio("AGFAT7X-8-bit-game-lose.mp3")
var jump = new Audio("Mario-jump-sound.mp3")

//player creation


const canvas = document.querySelector('canvas')
const c  = canvas.getContext('2d')
var winlose = document.getElementById('winlose')


canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5

class Player {
    constructor(){
        this.position = {
            x:100,
            y:100

        }
        this.velocity ={
            x:0,
            y: 0

        }
        this.width= 30
        this.height = 30
    }
    draw(){
        c.fillStyle='#ffff'
        c.fillRect( this.position.x, this.position.y, this.width , this.height)

    }
    update(){
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.draw()
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
        
        this.velocity.y += gravity
        // else this.velocity.y = 0

        else if(this.velocity.y -= 1){
            console.log('you lose')
            winlose.innerHTML='You lose'
            losemusic.play();

        }
        
    }
}

// platform creation

class Platform{
    // constructor lekk next platform pass cheyyum
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }

        this.width= 200
        this.height= 20
    }
    draw() {
        c.fillStyle ='black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [new Platform({x: 200, y: 100}),new Platform({x:500, y:200 }),new Platform({x:700, y:400 }),new Platform({x:900, y:200 }),new Platform({x:0,y:500}),new Platform({x:1100,y:300})] 

const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}
    

//  animate 

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0 , 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform =>{
        platform.draw()

    })

    // position stop
   

    if (keys.right.pressed && player.position.x /*< 400*/){
        platforms.forEach(platform =>{
            scrollOffset += 5
            platform.draw()
            player.velocity.x = 5
    
        })
        
    }else if(keys.left.pressed && player.position.x /*> 100*/ ){
        platforms.forEach(platform =>{
            platform.draw()
            player.velocity.x = -5
    
        })
      

    } else{ player.velocity.x = 0

        if(keys.right.pressed){
            scrollOffset += 5
            platforms.forEach(platform =>{
                platform.draw()
                platform.position.x -= 5
        
            })
            
        }else if(keys.left.pressed){
            scrollOffset -= 5
            platforms.forEach(platform =>{
                platform.draw()

                platform.position.x += 5
        
            })
        
            
        }
    }

    
    // platform collision detection 


 platforms.forEach(platform =>{
        platform.draw()

    
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }
})
// (winn scenario) win point


 


if (scrollOffset> 6000 && player.velocity.x  ){
    console.log("you win")
    winlose.innerHTML='You won 🎉'
    winmusic.play();
    this.velocity.y= 0
}



}

animate()

// key button

addEventListener('keydown', ({ keyCode }) => {
   /* console.log('keydown')
   console.log(keyCode)*/

    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            
            
            break

            case 83:
                console.log('down')
                break
        case 68:
            console.log('right')
            //player.velocity.x += 1    
            keys.right.pressed = true
            break  
        case 87:
            console.log('up')
            player.velocity.y -= 20 
            jump.play()          
            break
            case 38:
                console.log('up arrow')
                player.velocity.y -= 20   
                break
            case 39:
                console.log("right arrow")
                keys.right.pressed = true
                break    
            case 37:
                console.log("left arrow") 
                keys.left.pressed = true
                break

    }
    console.log(keys.right.pressed)    
    

})


addEventListener('keyup', ({ keyCode }) => {
    console.log('keydown')
    console.log(keyCode)
 
     switch(keyCode){
         case 65:
             console.log('left')
             keys.left.pressed = false
             
             break
 
             case 83:
                 console.log('down')
                 break
         case 68:
             console.log('right')
             //player.velocity.x =0
             keys.right.pressed = false
                
             break  
         case 87:
             console.log('up')
             player.velocity.y = 0 
             jump.play()           
             break
             case 38:
                console.log('up arrow')
                player.velocity.y = 0   
                jump.play()
                break
            case 39:
                    console.log("right arrow")
                    keys.right.pressed = false
                    jump.play()
                    break   
                    case 37:
                        console.log("left arrow") 
                        keys.left.pressed = false
                        break       
     }
     console.log(keys.right.pressed)
     
     
 
 })
 function re(){
    document.location.reload();
 }
