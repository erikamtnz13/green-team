var Monster = require("./monsters.js")

var GetRandomInt = (min, max) =>
{
    return Math.floor(Math.random() * (max - min + 1)) + min
}

var GenerateMonster = () =>
{
    let randNum = GetRandomInt(0,4) 
    let monster = Monster[randNum]

}

var GenerateItem = () =>
{
    let randNum = GetRandomInt(0,4) 
    let item = Item[randNum]
}

var GeneratePath = () =>
{
    let randNum = GetRandomInt(0,4) 
    let path = Path[randNum]
}

var Main = () =>
{
    var continueGame = true

    while(continueGame)
    {
        var randNum = GetRandomInt(1,3)
        
        switch(randNum)
        {
            case 1: GenerateMonster()
            break
            case 2: GenerateItem()
            break
            case 3: GeneratePath()
            break
        }
    }
    
}
