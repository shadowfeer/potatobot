const Discord = require('discord.js')
const client = new Discord.Client()

const libMerge = require('./mergings.js')

let plants = [
    {name: "potato", plantfert: 2, states: 4, tick: 10, images:[{number: 1, img: "semente batata.png"}, {number: 2, img: "batata fase1.png"}, {number: 3, img: "batata fase2.png"}, {number: 4, img: "batata fase3.png"}]}
]
let players = [{name: "name", tiles: [
    {tilename: "a1", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "a2", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "a3", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "b1", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "b2", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "b3", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "c1", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "c2", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false},
    {tilename: "c3", tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, iscollectable: false}
], inventory: {
    watertank: {water: 0, max: 450},
    fertilizebag: {red: 0, blue: 0, green: 0, purple: 0, max: 18},
    seedbag: {potato: 0, max: 18}
}
}]

client.on('ready', () => {
    console.log("conected as " + client.user.tag)
    client.user.setActivity("Fazendinha", {type: "WATCHING"})

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.members.cache.forEach((member) => players.push({name: member.user.username, tiles: [
            {tilename: "a1", x: "a", y: "1", posx: 12, posy: -96, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "a2", x: "a", y: "2", posx: 120, posy: -40, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "a3", x: "a", y: "3", posx: 228, posy: 16, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "b1", x: "b", y: "1", posx: -108, posy: -56, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "b2", x: "b", y: "2", posx: 0, posy: 0, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "b3", x: "b", y: "3", posx: 112, posy: 56, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "c1", x: "c", y: "1", posx: -228, posy: -16, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "c2", x: "c", y: "2", posx: -120, posy: 40, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false},
            {tilename: "c3", x: "c", y: "3", posx: -12, posy: 96, tilewet: false, wettime: 0, fertilizer: 0, fertilizertime: 0, planted: "plant", planttick: 0, plantstate: 0, plantfert: 0, iscollectable: false}
        ], inventory: {
            watertank: {water: 450, max: 450},
            fertilizebag: {red: 6, blue: 4, green: 4, purple: 4, max: 18},
            seedbag: {potato: 18, max: 18}
        }}))
    })


})

client.on('message', (receivedMessage) => {
    if(receivedMessage.author == client.user){
        return
    }
    
    if(receivedMessage.content.startsWith("/")){
        processCommand(receivedMessage)
    }

    function processCommand(receivedMessage){
        let fullCommand = receivedMessage.content.substr(1)
        let splitCommand = fullCommand.split(" ")
        let primaryCommand = splitCommand[0]
        let arguments = splitCommand.slice(1)
        let author = receivedMessage.author.username

        if(primaryCommand == "water"){
            waterCommand(receivedMessage, arguments, author)
        }
        if(primaryCommand == "show"){
            showCommand(receivedMessage, arguments, author, primaryCommand)
        }
        if(primaryCommand == "fertilize"){
            fertilizeCommand(receivedMessage, arguments, author)
        }
        if(primaryCommand == "plant"){
            plantCommand(receivedMessage, arguments, author)
        }
        if(primaryCommand == "tick"){
            tickCommand(receivedMessage, arguments, author)
        }
        if(primaryCommand == "collect"){
            collectCommand(receivedMessage, arguments, author)
        }
    }
    //
    function tickCommand(receivedMessage, arguments, author){
        console.table(players.find(s => s.name === author).tiles)
        players.find(s => s.name === author).tiles.forEach((tile) =>{
            var n = 1
            var f = .5
            if(tile.tilewet){
                f *= 2
                n += 1
            }
            if(tile.fertilizer == tile.plantfert){
                n += f
            }
            tile.planttick -= n
            tile.wettime -= 1
            tile.fertilizertime -= 1


            if(tile.wettime <= 0){
                tile.wettime = 0
                tile.tilewet = false
            }
            if(tile.fertilizertime <= 0){
                tile.fertilizer = 0
                tile.fertilizertime = 0
            }
            if(tile.planted != "plant"){
                var cs = 0
                plants.find(s => s.name == tile.planted).images.forEach((image) => {
                    if(image.number == plants.find(s => s.name == tile.planted).states) return
                    var ni = plants.find(s => s.name == tile.planted).tick / image.number
                    if(tile.planttick <= ni){
                        cs += 1
                    }
                })
                if(tile.planttick <= 0){
                    cs = plants.find(s => s.name == tile.planted).states
                    tile.iscollectable = true
                }
                tile.plantstate = cs
            }
            if(tile.planttick <= 0){
                tile.planttick = 0
            }
        })
        console.table(players.find(s => s.name === author).tiles)
    }

    function waterCommand(receivedMessage, arguments, author){
        if(arguments[0] == "all"){
            if(spend("water", "water", 25 * 9, author) == false){
                receivedMessage.channel.send("insufficient water supply" + " " + "(" + players.find(s => s.name === author).inventory.watertank.water + " / " + players.find(s => s.name === author).inventory.watertank.max + ")")
                return
            }
            players.find(s => s.name === author).tiles.forEach((tile) => waterTile(tile.tilename, 10))
            showCommand(receivedMessage, arguments, author)
        }

        if(arguments[0] != "all" && arguments[0] == "a1" ||arguments[0] == "a2" ||arguments[0] == "a3" ||arguments[0] == "b1" ||arguments[0] == "b2" ||arguments[0] == "b3" ||arguments[0] == "c1" ||arguments[0] == "c2" ||arguments[0] == "c3"){
            if(spend("water", "water", 25, author) == false){
                receivedMessage.channel.send("insufficient water supply" + " " + "(" + players.find(s => s.name === author).inventory.watertank.water + " / " + players.find(s => s.name === author).inventory.watertank.max + ")")
                return
            }
            waterTile(arguments[0], 10)
            console.table(players.find(String => String.name === author).tiles)
            showCommand(receivedMessage, arguments, author)
        }
        
        if(arguments[0] == "row"){
            if(spend("water", "water", 25 * 3, author) == false){
                receivedMessage.channel.send("insufficient water supply" + " " + "(" + players.find(s => s.name === author).inventory.watertank.water + " / " + players.find(s => s.name === author).inventory.watertank.max + ")")
                return
            }

            players.find(s => s.name === author).tiles.forEach((tile) => {
                if(tile.x == arguments[1] || tile.y == arguments[1]){
                    waterTile(tile.tilename, 10)
                }
            })
            showCommand(receivedMessage, arguments, author)
        }
        function waterTile(tilepos, intensity){
            players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).tilewet = true
            players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).wettime = intensity
        }
    }

    function fertilizeCommand(receivedMessage, arguments, author){
        if(arguments[0] != "blue" && arguments[0] != "red" && arguments[0] != "green" && arguments[0] != "purple")
        var color = 0
        if(arguments[0] == "blue"){
            color = 1
        }
        if(arguments[0] == "red"){
            color = 2
        }
        if(arguments[0] == "green"){
            color = 3
        }
        if(arguments[0] == "purple"){
            color = 4
        }

        if(arguments[1] == "all"){
            if(spend("fertilizer", arguments[0], 9, author) == false){
                receivedMessage.channel.send("insufficient fertilizer supply" + " " + "(" + players.find(s => s.name === author).inventory.fertilizebag[arguments[0]] + " / " + players.find(s => s.name === author).inventory.fertilizebag.max + ")")
                return
            }

            players.find(s => s.name === author).tiles.forEach((tile) => fertilizeTile(tile.tilename, 10))
            showCommand(receivedMessage, arguments, author)

        }
        if(arguments[1] == "a1" || arguments[1] == "a2" || arguments[1] == "a3" || arguments[1] == "b1" || arguments[1] == "b2" || arguments[1] == "b3" || arguments[1] == "c1" || arguments[1] == "c2" || arguments[1] == "c3"){
            if(spend("fertilizer", arguments[0], 9, author) == false){
                receivedMessage.channel.send("insufficient fertilizer supply" + " " + "(" + players.find(s => s.name === author).inventory.fertilizebag[arguments[0]] + " / " + players.find(s => s.name === author).inventory.fertilizebag.max + ")")
                return
            }

            fertilizeTile(arguments[1], 10)
            showCommand(receivedMessage, arguments, author)
        }
        if(arguments[1] == "row"){
            if(arguments[2] != "blue" && arguments[2] != "red" && arguments[2] != "green" && arguments[2] != "purple")

            if(spend("fertilizer", arguments[0], 9, author) == false){
                receivedMessage.channel.send("insufficient fertilizer supply" + " " + "(" + players.find(s => s.name === author).inventory.fertilizebag[arguments[0]] + " / " + players.find(s => s.name === author).inventory.fertilizebag.max + ")")
                return
            }

            players.find(s => s.name === author).tiles.forEach((tile) => {
                if(tile.x == arguments[2] || tile.y == arguments[2]){
                    fertilizeTile(tile.tilename, 10)
                }
            })
            showCommand(receivedMessage, arguments, author)
        }
        function fertilizeTile(tilepos, intensity){
            players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).fertilizer = color
            players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).fertilizertime = intensity
        }
    }

    function plantCommand(receivedMessage, arguments, author){
        if(typeof(plants.find(s => s.name === arguments[0])) != "undefined"){
            if(arguments[1] == "all"){
                if(spend("seed", arguments[0], 9, author) == false){
                    receivedMessage.channel.send("insufficient seed supply" + " " + "(" + players.find(s => s.name === author).inventory.seedbag[arguments[0]] + " / " + players.find(s => s.name === author).inventory.seedbag.max + ")")
                    return    
                }

                players.find(s => s.name === author).tiles.forEach((tile) => {
                    plantTile(tile.tilename, arguments[0])
                })
                showCommand(receivedMessage, arguments, author)
            }
            if(arguments[1] == "a1" || arguments[1] == "a2" || arguments[1] == "a3" || arguments[1] == "b1" || arguments[1] == "b2" || arguments[1] == "b3" || arguments[1] == "c1" || arguments[1] == "c2" || arguments[1] == "c3"){
                if(spend("seed", arguments[0], 1, author) == false){
                    receivedMessage.channel.send("insufficient seed supply" + " " + "(" + players.find(s => s.name === author).inventory.seedbag[arguments[0]] + " / " + players.find(s => s.name === author).inventory.seedbag.max + ")")
                    return    
                }
                
                plantTile(arguments[1], arguments[0])
                showCommand(receivedMessage, arguments, author)
            }
            if(arguments[1] == "row"){
                if(spend("seed", arguments[0], 3, author) == false){
                    receivedMessage.channel.send("insufficient seed supply" + " " + "(" + players.find(s => s.name === author).inventory.seedbag[arguments[0]] + " / " + players.find(s => s.name === author).inventory.seedbag.max + ")")
                    return    
                }

                players.find(s => s.name === author).tiles.forEach((tile) => {
                    if(tile.x == arguments[2] || tile.y == arguments[2]){
                        plantTile(tile.tilename, arguments[0])
                    }
                })
                showCommand(receivedMessage, arguments, author)
            }
            function plantTile(tilepos, plant){
                var plantType = plants.find(s => s.name === plant)
                players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).planted = plant
                players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).planttick = plantType.tick
                players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).plantstate = 1
                players.find(s => s.name === author).tiles.find(s => s.tilename == tilepos).plantfert = plantType.plantfert
            }
        }
    }

    function showCommand(receivedMessage, arguments, author, primaryCommand){
        if(arguments[0] == "farm" || primaryCommand != "show"){
            mix(receivedMessage, author, 1)
            receivedMessage.channel.send("Loading...")
        }
        if(arguments[0] == "inventory"){
            mixinv(receivedMessage, author, 1)
            receivedMessage.channel.send("Loading...")
        }
        
        function mixinv(receivedMessage, author, time){

        }
        function mix(receivedMessage, author, time){

            var values = players.find(s => s.name === author).tiles
            var imgvalues = []
            var mainimg = "dirt.png"
            if(time > 1) mainimg = "merge.png"
            values.forEach((tile) =>{
                if(time == 1){
                    if(tile.tilewet == true){
                        imgvalues.push({name: tile.tilename, img: "watereddirt.png", posx: tile.posx, posy: tile.posy})
                    }else{
                        imgvalues.push({name: tile.tilename, img: "no.png", posx: tile.posx, posy: tile.posy})
                    }
                }
                if(time == 2){
                    if(tile.fertilizer == 0){
                        imgvalues.push({name: tile.tilename, img: "no.png", posx: tile.posx, posy: tile.posy})
                    }
                    if(tile.fertilizer == 1){
                        imgvalues.push({name: tile.tilename, img: "terra adubada azul.png", posx: tile.posx, posy: tile.posy})
                    }
                    if(tile.fertilizer == 2){
                        imgvalues.push({name: tile.tilename, img: "terra adubada vermelha.png", posx: tile.posx, posy: tile.posy})
                    }
                    if(tile.fertilizer == 3){
                        imgvalues.push({name: tile.tilename, img: "terra adubada verde.png", posx: tile.posx, posy: tile.posy})
                    }
                    if(tile.fertilizer == 4){
                        imgvalues.push({name: tile.tilename, img: "terra adubada roxa.png", posx: tile.posx, posy: tile.posy})
                    }
                }
                if(time == 3){
                    if(tile.planted != "plant"){
                        imgvalues.push({name: tile.tilename,
                             img: plants.find(s => s.name === tile.planted).images.find(image => image.number == tile.plantstate).img,
                              posx: tile.posx, posy: tile.posy
                            })
                    }
                    if(tile.planted == "plant"){
                        imgvalues.push({name: tile.tilename, img: "no.png", posx: tile.posx, posy: tile.posy})
                    }
                }
            })
            libMerge.doMerge(receivedMessage, mainimg, 
            imgvalues.find(tile => tile.name === "a1"), 
            imgvalues.find(tile => tile.name === "a2"), 
            imgvalues.find(tile => tile.name === "a3"), 
            imgvalues.find(tile => tile.name === "b1"), 
            imgvalues.find(tile => tile.name === "b2"), 
            imgvalues.find(tile => tile.name === "b3"), 
            imgvalues.find(tile => tile.name === "c1"), 
            imgvalues.find(tile => tile.name === "c2"), 
            imgvalues.find(tile => tile.name === "c3"), 
            "merge.png").then((res) => {
                if(time == 3){
                    receivedMessage.channel.send(receivedMessage.author.toString() + "'s farm", {files: ["./images/merge.png"]})
                }else{
                    mix(receivedMessage, author, time + 1)
                }
            })
        }
    }

    function collectCommand(receivedMessage, arguments, author){
        if(arguments[0] == "all"){
            players.find(s => s.name === author).tiles.forEach((tile) => {
                collectTile(tile.tilename)
            })
            showCommand(receivedMessage, arguments, author)
        }
        if(arguments[0] == "a1" || arguments[0] == "a2" || arguments[0] == "a3" || arguments[0] == "b1" || arguments[0] == "b2" || arguments[0] == "b3" || arguments[0] == "c1" || arguments[0] == "c2" || arguments[0] == "c3"){
            collectTile(arguments[0])
            showCommand(receivedMessage, arguments, author)
        }
        if(arguments[0] == "row"){
            players.find(s => s.name === author).tiles.forEach((tile) => {
                if(tile.x == arguments[1] || tile.y == arguments[1]){
                    collectTile(tile.tilename)
                }
            })
            showCommand(receivedMessage, arguments, author)
        }
        function collectTile(tilepos){
            if(players.find(s => s.name === author).tiles.find(s => s.tilename === tilepos).iscollectable){
                players.find(s => s.name === author).tiles.find(s => s.tilename === tilepos).planted = "plant"
                players.find(s => s.name === author).tiles.find(s => s.tilename === tilepos).plantstate = 0
                players.find(s => s.name === author).tiles.find(s => s.tilename === tilepos).plantfert = 0
                players.find(s => s.name === author).tiles.find(s => s.tilename === tilepos).iscollectable = false
            }
        }
    }

    function spend(productSector, product, amount, author){
        if(productSector == "water"){
            if(players.find(s => s.name === author).inventory.watertank.water < amount){
                console.table(players.find(String => String.name === author).tiles)
                return false
            }
            players.find(s => s.name === author).inventory.watertank.water -= amount
            return true
        }
        if(productSector == "fertilizer"){
            if(players.find(s => s.name === author).inventory.fertilizebag[product] < amount){return false}
            players.find(s => s.name === author).inventory.fertilizebag[product] -= amount
            return true
        }
        if(productSector == "seed"){
            if(players.find(s => s.name === author).inventory.seedbag[product] < amount){return false}
            players.find(s => s.name === author).inventory.seedbag[product] -= amount
            return true
        }
    }
})

client.login("Nzc2NDA4MTcxMDg2MzQ4MzE5.X60cdA.BJiE_YNEiuxx5N8g0yDxOJ6YqhU")