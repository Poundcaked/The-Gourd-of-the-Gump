var gumpcoins = 0
var gumpmetal = 1000
var cash = 0.00;

var metal_amount = 1000
var metal_price = 10.00

var pricePerCoin = 0.10

var autosmelterCost = 50
var autosmelterLvl = 0

var saveTimer = 0;
var secTimer = 0;

window.setInterval(function(){ //auto save (taken almost directly from universal paperclips  )
    saveTimer++;
    if(saveTimer >= 250){
        save();
        saveTimer = 0;
    }
}, 100);

var autoBuildup = 0
window.setInterval(function(){ //main loop

    autoBuildup+= (autosmelterLvl/250)
    if(autoBuildup > 1){
        smelt(1)
        autoBuildup = 0
    }
    
    secTimer++;
    if (secTimer >= 10 * 360){
        var maxPrice = (((0.6*cash)+((0.6*gumpcoins)*(0.5*pricePerCoin)))/4)+10
        metal_price = Math.floor(Math.random() * (maxPrice - 3) ) + 3
        metal_amount = Math.floor(Math.random() * (Math.pow(maxPrice,1.6) - 100) ) + 100
        secTimer = 0;
        updateVariables()
    }
    
    updateVariables()
}, 10);

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
            pricePerCoin = Number(Number(pricePerCoin - 0.01).toFixed(2))
            updateVariables()
        }
    });
    $("#increasePriceButton").click(function() {
        pricePerCoin = Number(Number(pricePerCoin + 0.01).toFixed(2))
        updateVariables()
    });
    
    $("#sellButton").click(function() {
        sell()
        updateVariables()
    });    
    $("#saveButton").click(function() {
        save()
    });

    $("#makeAutosmelterButton").click(function(){
        makeAutosmelter()
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
        cash = Number(cash.toFixed(2))
    }
}

function setMoney(mn){
    cash = mn
    updateVariables()
}

function updateVariables(){
    $("#gumpcoin").html("Gump-Coins: "+Math.floor(Number(gumpcoins)).toLocaleString());
    $("#gumpmetal").html("Gump Metal: "+Math.floor(Number(gumpmetal)).toLocaleString());
    $("#cash").html("$"+(Number(cash).toFixed(2)));
    $("#autosmelter").html("Autosmelters: "+Number(autosmelterLvl).toLocaleString());
    
    $("#pricePerCoin").html("Gump Coin Price: $"+Number(pricePerCoin).toFixed(2));
    $("#buyMetalButton").html("Buy more Gump Metal ($"+Number(metal_price).toFixed(2)+" for "+ metal_amount +")");
    $("#makeAutosmelterButton").html("Construct Autosmelter ($"+Number(autosmelterCost).toFixed(2)+")");


    $("#true_gc").html("coin "+gumpcoins);
    $("#true_gm").html("metal "+gumpmetal);
    $("#true_c").html("$"+cash);
    $("#true_mp").html("metal price "+metal_price);
    $("#true_ma").html("metal amt "+metal_amount);
    $("#true_ppc").html("ppc "+pricePerCoin);
    $("#true_alvl").html("Auto lvl "+autosmelterLvl);
    $("#true_ap").html("Auto cost "+autosmelterCost);
}

function save(){
    const dataObject = {
    gumpcoins: gumpcoins,
    gumpmetal: gumpmetal,
    cash: cash,
    metal_amount: metal_amount,
    metal_price: metal_price,
    pricePerCoin: pricePerCoin,
    autosmelterLvl: autosmelterLvl,
    autosmelterCost: autosmelterCost
    };

    const jsonString = JSON.stringify(dataObject);
    localStorage.setItem('data',jsonString)
    displayMessage("Saved: " + new Date().toLocaleTimeString())
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
            autosmelterLvl = loadedData.autosmelterLvl;
            autosmelterCost = loadedData.autosmelterCost;
        }
    }
    updateVariables()
}

function displayMessage(msg){
    $("#console5").html(console4.innerHTML)
    $("#console4").html(console3.innerHTML)
    $("#console3").html(console2.innerHTML)
    $("#console2").html(console1.innerHTML)
    $("#console1").html(msg)
}

function makeAutosmelter(){
    if(cash >= autosmelterCost){
        autosmelterLvl += 1;
        cash -= autosmelterCost;
        autosmelterCost = Math.pow(1.1,autosmelterLvl)+50;
        updateVariables();
    }
}

function smelt(n){
    if(n > gumpmetal){
        n = gumpmetal
    }
    if(gumpmetal > 0){
        gumpcoins+=n
        gumpmetal-=n
    }
}

function cheat(){
    //gumpcoins = 10000
    cash = 50
    //gumpmetal = 10000
    //pricePerCoin = 1000
    updateVariables()
}

function reset(){
    localStorage.removeItem("data")
    location.reload()
}