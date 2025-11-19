var gumpcoins = 0
var gumpmetal = 1000
var cash = 0.00;

var metal_amount = 1000
var metal_price = 10.00

var pricePerCoin = 0.10

var autosmelters = 0

$(document).ready(function() {
    load()
    updateVariables()

    $("#makeButton").click(function() {
        if(gumpmetal>0){
            makeGumpcoin(1)
        }
    });

    $("#buyMetalButton").click(function() {
        if(cash > metal_price){
            buyMetal(metal_amount, metal_price)
        }
    });

    $("#decreasePriceButton").click(function() {
        if(pricePerCoin > 0){
            pricePerCoin -= 0.01
            updateVariables()
        }
        
    });

    $("#increasePriceButton").click(function() {
        pricePerCoin += 0.01
        updateVariables()
    });
    
    $("#sellButton").click(function() {
        sell()
        updateVariables()
    });    
    $("#saveButton").click(function() {
        save()
    });
});

function makeGumpcoin(amt){
    gumpmetal-=amt
    gumpcoins+=amt
    updateVariables()
}

function buyMetal(amt, price){
    gumpmetal += amt
    cash -= price
    updateVariables()
}

function useCash(amt){
    cash += amt
    updateVariables()
}

function sell(){
    const length = gumpcoins
    for (let index = 0; index < length; index++) {
        cash += pricePerCoin
        gumpcoins -= 1
        
    }
}

function updateVariables(){
    $("#gumpcoin").html("Gump-Coins: "+Number(gumpcoins).toLocaleString());
    $("#gumpmetal").html("Gump Metal: "+Number(gumpmetal).toLocaleString());
    $("#cash").html("$"+Number(cash).toFixed(2));
    
    $("#pricePerCoin").html("Gump Coin Price: $"+Number(pricePerCoin).toFixed(2));

    
    $("#buyMetalButton").html("Buy more Gump Metal ($"+Number(metal_price).toFixed(2)+" -> "+ metal_amount +")");
}

function save(){
    const dataObject = {
    gumpcoins: gumpcoins,
    gumpmetal: gumpmetal,
    cash: cash,
    metal_amount: metal_amount,
    metal_price: metal_price,
    pricePerCoin: pricePerCoin,
    autosmelters: autosmelters
    };

    const jsonString = JSON.stringify(dataObject);
    localStorage.setItem('data',jsonString)
}

function load(){
    const retrievedJsonString = localStorage.getItem("data");
    if (retrievedJsonString) {
        const loadedData = JSON.parse(retrievedJsonString);
        if (loadedData) {
            gumpcoins = loadedData.gumpcoins;
            gumpmetal = loadedData.gumpmetal;
            cash = loadedData.cash;
            metal_amount = loadedData.metal_amount;
            metal_price = loadedData.metal_price;
            pricePerCoin = loadedData.pricePerCoin;
            autosmelters = loadedData.autosmelters;
        }
    }
    updateVariables()
}