window.onload = init
function init(){
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext('2d')
    var widthCanvas = canvas.width
    var heightCanvas = canvas.height

    var widthShip = 20
    var heightShip = 20
    var xShip = 10
    var yShip = 5
    var tabShips = []
    var shipAllowedToFire = []
    var speedShis = 100
    var iteretionShoot = 1000
    var speedShoot = 50
    var widthShoot = 10
    var heightShoot = 10
    var imgShip = document.getElementById('img')
    var imgMissile = document.getElementById('mi')
    var numberOfShipsPerLine = 9
    var numberOfLines = 3
    
    var widthCanon = 20
    var heightCanon = 20
    var xCanon = 10
    var yCanon = heightCanvas - heightCanon
    var key = []
    var speedCanon = 5

    function createCanon(){
        ctx.fillStyle = 'green'
        ctx.fillRect(xCanon,yCanon,widthCanon,heightCanon)
    }
    createCanon()
    function deleteCanon(){
        ctx.clearRect(xCanon,yCanon,widthCanon,heightCanon)
    }
    function keyPress(){
        document.body.addEventListener("keydown", function(ev){
            key[ev.keyCode] = true
        })
        
        document.body.addEventListener("keyup", function(ev){
            key[ev.keyCode] = false
        })
        window.requestAnimationFrame(keyPress)
        if (key[37]) {
            if (xCanon < 5) {}
            else{
                deleteCanon()
                xCanon -= speedCanon
                createCanon()   
            }
        }
        else if(key[39]){
            if (xCanon > widthCanvas - widthShip - 5) {}
            else{
                deleteCanon()
                xCanon += speedCanon
                createCanon()
            }
        }
    }
    document.addEventListener("keyup",(ev)=>{
        if(ev.keyCode == 38){
            var xShoot = xCanon + 6
            var yShoot = yCanon - 5
            var setIntervalShootCanon = setInterval(()=>{ 
                ctx.fillStyle = 'black'
                ctx.clearRect(xShoot + 2,yShoot,5,5)
                yShoot--
                ctx.fillRect(xShoot + 2,yShoot,5,5)
                for(var i = 0; i < tabShips.length; i++){
                    if (xShoot > tabShips[i].x - 5 && xShoot < tabShips[i].x + 20) {
                        if (yShoot - tabShips.length + 6 == tabShips[i].y) {
                            ctx.clearRect(xShoot + 2,yShoot,5,5)
                            clearInterval(setIntervalShootCanon)
                            tabShips[i].live--
                            console.log('colision detecter avec le vaisseau n°' + i + " vie retante : " + tabShips[i].live)
                        }
                    }
                }
            },20)
        }
    })
    keyPress()
    function checkLiveShips(){
        var se = setInterval(()=>{
            for(var i = 0;i < tabShips.length; i++){
                if (tabShips[i].live <= 0) {
                    ctx.clearRect(tabShips[i].x,tabShips[i].y,widthCanon,heightCanon)
                    tabShips[i].x = 1000
                    tabShips[i].destroy = true
                    tabShips[i - 1].shoot = true
                }
            }
        },10)
    }
    checkLiveShips()

    function spaceship(x, y){
        var ObjShip = {
            x : x,
            y : y,
            index : 0,
            live : 4,
            shoot : false,
            destroy : false,
            widthShip : widthShip,
            heightShip : heightShip,
            color : 'white',
        }
        ctx.drawImage(imgShip,ObjShip.x, ObjShip.y, ObjShip.widthShip, ObjShip.heightShip)
        return ObjShip
    }
    function addShipToTab(){
        for(var i = 0; i < numberOfShipsPerLine;i++){
            for(var j = 0; j < numberOfLines ; j++){
                tabShips.push(spaceship(xShip + (i * 30), yShip + (j * 21)))
            }
        }
        for(var i = 0; i < tabShips.length; i++){
            tabShips[i].index = i
        }
    }
    addShipToTab()
    function moveShipsRigth(){
        var setMoveRigth = setInterval(()=>{
            for(var i = 0; i < tabShips.length;i++){
                if (tabShips[i].x == widthCanvas - 20){
                    for(var j = 0; j < tabShips.length;j++){
                        ctx.clearRect(tabShips[j].x, tabShips[j].y, tabShips[j].widthShip, tabShips[j].heightShip)
                        tabShips[j].y++
                        ctx.drawImage(imgShip,tabShips[j].x, tabShips[j].y, tabShips[j].widthShip, tabShips[j].heightShip)
                    }
                    tabShips[i].x++
                    tabShips[i+1].x++
                    tabShips[i+2].x++
                    moveShipsLeft()
                    clearInterval(setMoveRigth)
                    return 0
                }
                else{
                    ctx.fillStyle = 'white'
                    ctx.clearRect(tabShips[i].x, tabShips[i].y, tabShips[i].widthShip, tabShips[i].heightShip)
                    tabShips[i].x++
                    ctx.drawImage(imgShip,tabShips[i].x, tabShips[i].y, tabShips[i].widthShip, tabShips[i].heightShip)
                }
            }
        },speedShis)
    }
    function moveShipsLeft(){
        var setMoveLeft = setInterval(()=>{
            for(var i = 0; i < tabShips.length;i++){
                if (tabShips[i].x == 0){
                    for(var j = 0; j < tabShips.length;j++){
                        ctx.fillStyle = 'white'
                        ctx.clearRect(tabShips[j].x, tabShips[j].y, tabShips[j].widthShip, tabShips[j].heightShip)
                        tabShips[j].y++
                        ctx.drawImage(imgShip,tabShips[j].x, tabShips[j].y, tabShips[j].widthShip, tabShips[j].heightShip)
                    }
                    moveShipsRigth()
                    clearInterval(setMoveLeft)
                    return 0
                }
                else{
                    ctx.fillStyle = 'white'
                    ctx.clearRect(tabShips[i].x, tabShips[i].y, tabShips[i].widthShip, tabShips[i].heightShip)
                    tabShips[i].x--
                    ctx.drawImage(imgShip,tabShips[i].x, tabShips[i].y, tabShips[i].widthShip, tabShips[i].heightShip)    
                }
            }
        },speedShis)
    }
    moveShipsRigth()
    function removeShip(target){
        var ship = tabShips[target]
        ctx.clearRect(ship.x, ship.y, ship.widthShip, ship.heightShip)
    }
    function whichShipWillFire(){
        for(var i = 2; i < tabShips.length; i = i + 3){
            if (!tabShips[i].destroy) {
             tabShips[i].shoot = true
             shipAllowedToFire.push(tabShips[i])
            }
            else{
                tabShips[i-1].shoot = true
                shipAllowedToFire.push(tabShips[i-1])
            }
         }
    }
    whichShipWillFire()
    function randomShootShip(){
        var random = Math.floor(Math.random() * shipAllowedToFire.length)
        return random   
    }
    function shootShip() {
        var interval = setInterval(()=>{
            random = randomShootShip()
            var objShoot = {
                x : shipAllowedToFire[random].x + widthShip / 2 - 2,
                y : shipAllowedToFire[random].y + heightShip,
            }
            var intervalSoot = setInterval(()=>{
                var obj = new Object(objShoot)
                ctx.fillStyle = 'green'
                ctx.clearRect(obj.x, obj.y, widthShoot, heightShoot)
                obj.y++
                ctx.drawImage(imgMissile,obj.x, obj.y, widthShoot, heightShoot)
                if (obj.y == heightCanvas - 30 && obj.x > xCanon - 5 && obj.x < xCanon + 15) {
                    ctx.clearRect(obj.x, obj.y, widthShoot, heightShoot)
                    clearInterval(intervalSoot)
                }
                if (obj.y == heightCanvas) {
                    ctx.clearRect(obj.x, obj.y, widthShoot, heightShoot)
                    clearInterval(intervalSoot)
                }
            },speedShoot)
        },iteretionShoot)
    }
    shootShip()
}