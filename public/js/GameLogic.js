$(document).ready(($) =>
{
    var Monster = require("./Monsters.js")
    var continueGame = true

    $("#Done").click((e) =>
    {
        continueGame = e.target.value
    })

    var GetRandomInt = (min, max) =>
    {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    var GenerateMonster = () =>
    {
        let randNum = GetRandomInt(0,4) 
        let monster = Monster[randNum]
        return monster
    }

    var GenerateItem = () =>
    {
        let randNum = GetRandomInt(0,4) 
        let item = Item[randNum]
        return item
    }

    var GeneratePath = () =>
    {
        let randNum = GetRandomInt(0,4) 
        let path = Path[randNum]
        return path
    }

    var GenerateScenario = () =>
    {
        var randNum = GetRandomInt(1,3)
        var scenario
        
        switch(randNum)
        {
            case 1: scenario = GenerateMonster()
            break
            case 2: scenario = GenerateItem()
            break
            case 3: scenario = GeneratePath()
            break
        }

        return scenario    
    }

    var Main = () =>
    {
        while(continueGame)
        {
        GenerateScenario()
        }
        
    }

})