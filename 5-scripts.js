// might not need this
const playerspicked = [];
const playeroptions = [];

// RATINGS - delete the last one if ever needed!
const playerratings = [93, 90, 92, 92, 86, 89, 93, 82, 83, 73, 82, 83, 89, 78, 74, 85, 84, 72, 80, 76, 70, 72, 66, 77, 84, 83, 69, 87, 66, 84, 91, 92, 91, 90, 87, 88, 87, 88, 85, 88, 83, 92, 85, 76, 81, 84, 81, 79, 82, 76, 72, 84, 70, 80, 82, 88, 82, 61, 85, 90, 74, 66, 62, 77, 71, 90, 88, 85, 86, 87, 84, 85, 89, 75, 82, 84, 84, 83, 85, 80, 83, 81, 76, 82, 74, 76, 65, 80, 73, 85, 81, 85, 78, 66, 84, 82, 90]

const NUMSTRIKERS = 30;
const NUMMIDS = 34;
const NUMDEFS = 26;
const NUMGKS = 6;
const NUMPLAYERS = NUMSTRIKERS + NUMMIDS + NUMDEFS + NUMGKS;


function randgenerate(min, max) {
    document.getElementById("options").classList.remove("hidden");
    return (Math.floor(Math.random() * (max - min + 1)) + min);
 }

function stars(starcount) {
    const stars = document.getElementsByClassName("fa-star");
    var i=0
    while (i<5) {
        stars[i].classList.remove("checked");
        i+=1;
    }
    if (starcount>=1) {
        document.getElementById("star1").classList.add("checked");
    } if (starcount>=2) {
        document.getElementById("star2").classList.add("checked");
    } if (starcount >=3) {
        document.getElementById("star3").classList.add("checked");
    } if (starcount >=4) {
        document.getElementById("star4").classList.add("checked");
    } if (starcount >=5) {
        document.getElementById("star5").classList.add("checked");
    }
    const player_count = playerspicked.length;
    if (player_count > 5) {

    } else {
        const chem_value = Math.round(player_count*20);
        document.getElementById("chem-score").innerHTML = chem_value;
        const chem_str_value = chem_value+'%';
        document.getElementById("bar-1").style.setProperty("width", chem_str_value);
    }
}

function rating() {
    var i=0;
    var sum=0;
    const l = playerspicked.length;
    console.log("l = "+l);
    while (i<l) {
        sum += playerratings[(playerspicked[i])];
        console.log(sum);
        i++;
    }
    var rating = Math.round(sum/l);
    console.log(rating);
    document.getElementById("rating-score").innerHTML = rating;
    if (rating < 50) {
        stars(1);
    } else if (rating < 65) {
        stars(2);
    } else if (rating < 75) {
        stars(3);
    } else if (rating < 85) {
        stars(4);
    } else {
        stars(5);
    }
    return;
}

function pickthree() {
    playeroptions.length = 0;
    if (playerspicked.length < 1) {
        // then this is a striker
        while (playeroptions.length != 3) {
            pot_player = randgenerate(0,(NUMSTRIKERS-1));
            if (playeroptions.includes(pot_player) || playerspicked.includes(pot_player)) {
                // do nothing
            } else {
                playeroptions.push(pot_player);
            }
        }
    } else if (playerspicked.length < 3) {
        // then this is a midfielder
        while (playeroptions.length != 3) {
            pot_player = randgenerate(NUMSTRIKERS,(NUMSTRIKERS+NUMMIDS-1));
            if (playeroptions.includes(pot_player) || playerspicked.includes(pot_player)) {
                // do nothing
            } else {
                playeroptions.push(pot_player);
            }
        }
    } else if (playerspicked.length < 4) {
        // then this is a defender
        while (playeroptions.length != 3) {
            pot_player = randgenerate((NUMSTRIKERS+NUMMIDS),(NUMPLAYERS-NUMGKS-1));
            if (playeroptions.includes(pot_player) || playerspicked.includes(pot_player)) {
                // do nothing
            } else {
                playeroptions.push(pot_player);
            }
        }
    } else if (playerspicked.length < 5) {
        // this is the gk
        // then this is a defender
        while (playeroptions.length != 3) {
            pot_player = randgenerate((NUMPLAYERS-NUMGKS),(NUMPLAYERS-1));
            if (playeroptions.includes(pot_player) || playerspicked.includes(pot_player)) {
                // do nothing
            } else {
                playeroptions.push(pot_player);
            }
        }
    } else if (playerspicked.length < 8) {
        while (playeroptions.length != 3) {
            pot_player = randgenerate(0,(NUMPLAYERS-1));
            if (playeroptions.includes(pot_player) || playerspicked.includes(pot_player)) {
                // do nothing
            } else {
                playeroptions.push(pot_player);
            }
        }
    } else {
        // do something here that greys out the box
        console.log("Team complete!");
        generatesummary();
        document.getElementById("summary-backdrop").classList.toggle("closed");
        document.getElementById("selection").classList.toggle('closediv');
        return;
    }
    document.getElementById("generate").classList.toggle("hidden");
    console.log(playeroptions);
    setTimeout(()=> {
        document.getElementById("option1").innerHTML = '<img src="img/1x/player'+playeroptions[0]+'.png" alt="Player Card">';
    }
    ,1000);
    setTimeout(()=> {
        document.getElementById("option2").innerHTML = '<img src="img/1x/player'+playeroptions[1]+'.png" alt="Player Card">';
    }
    ,2000);
    setTimeout(()=> {
        document.getElementById("option3").innerHTML = '<img src="img/1x/player'+playeroptions[2]+'.png" alt="Player Card">';
    }   
    ,3000);
    if (playerspicked.length == 7) {
        document.getElementById("generate-btn").innerHTML = "COMPLETE THE TEAM";
    }
}

function generatesummary() {
    console.log("Successful generation");
}

function chosen(playerindex) {
    playerspicked.push(playeroptions[playerindex]);
    const player_number = 9-playerspicked.length;
    const player_id_string = ("#player-"+player_number);
    const player_img_string = ("img/1x/player"+playeroptions[playerindex]+".png");
    console.log(player_id_string);
    console.log(player_img_string);
    document.getElementById("options").classList.toggle('hidden');
    document.getElementById("generate").classList.toggle('hidden');
    $(player_id_string).attr("src",player_img_string);
    console.log(playerspicked);
    document.getElementById("option1").innerHTML = '<img src="img/1x/blankplayercard.png" alt="Player card">';
    document.getElementById("option2").innerHTML = '<img src="img/1x/blankplayercard.png" alt="Player card">';
    document.getElementById("option3").innerHTML = '<img src="img/1x/blankplayercard.png" alt="Player card">';
    rating();
}

function hide() {
    const items = document.getElementsByClassName("select-main");
    var i = 0;
    while (i<(items.length)) {
        document.getElementsByClassName("select-main").item(i).classList.toggle("closediv");
        i++;
    }
    document.getElementById("selection").classList.toggle("shrink");
}

//form for swapping players (copied code snippets)
function posSwap() {
    const from = document.getElementById("posswaps-form").elements[0].value;
    const to = document.getElementById("posswaps-form").elements[1].value;
    console.log("swapping between "+from+","+to);

    const player_from = "#player-"+from; // the LW's id
    const player_to = "#player-"+to; // the ST's id

    const photo_from = $(player_from).attr('src') // the LW's current img
    const photo_to = $(player_to).attr('src'); // the ST's current img

    $(player_from).attr("src",photo_to); // swap
    $(player_to).attr("src",photo_from); // swap
}

function closeSummary() {
    document.getElementById("summary-backdrop").classList.toggle("closed");
    console.log("Summary was closed");
}

function generatesummary() {
    var i=0;
    var sum=0;
    const l = playerspicked.length;
    console.log("l = "+l);
    while (i<l) {
        sum += playerratings[(playerspicked[i])];
        console.log(sum);
        i++;
    }
    var rating = Math.round(sum/l);
    console.log(rating);
    document.getElementById("summary-rating-score").innerHTML = rating;
    if (rating < 50) {
        summarystars(1);
    } else if (rating < 65) {
        summarystars(2);
    } else if (rating < 75) {
        summarystars(3);
    } else if (rating < 85) {
        summarystars(4);
    } else {
        summarystars(5);
    }
    topplayers();
    return;
}

function topplayers() {
    var bestFWD;
    var bestMID;
    var bestDEFGK;
    var bestFWDRating = 0;
    var bestMIDRating = 0;
    var bestDEFGKRating = 0;
    //find highest rated FWD
    var i=0;
    while (i < playerspicked.length) {
        var player = playerspicked[i];
        if (player < NUMSTRIKERS) {
            if (playerratings[player] > bestFWDRating) {
                bestFWD = player;
                bestFWDRating = playerratings[player];
            }
        } else if (player < (NUMSTRIKERS+NUMMIDS)) {
            if (playerratings[player] > bestMIDRating) {
                bestMID = player;
                bestMIDRating = playerratings[player];
            }
        } else {
            if (playerratings[player] > bestDEFGKRating) {
                bestDEFGK = player;
                bestDEFGKRating = playerratings[player];
            }
        }
        console.log(bestFWD, bestMID, bestDEFGK);
        i+=1;
    }

    $("#starFWD").attr("src",'img/1x/player'+bestFWD+'.png');
    $("#starMID").attr("src",'img/1x/player'+bestMID+'.png');
    $("#starDEFGK").attr("src",'img/1x/player'+bestDEFGK+'.png');
}

function summarystars(starcount) {
    const stars = document.getElementsByClassName("fa-star");
    console.log("made it here1");
    if (starcount>=1) {
        document.getElementById("sstar1").classList.add("checked");
    } if (starcount>=2) {
        document.getElementById("sstar2").classList.add("checked");
    } if (starcount >=3) {
        document.getElementById("sstar3").classList.add("checked");
    } if (starcount >=4) {
        document.getElementById("sstar4").classList.add("checked");
    } if (starcount >=5) {
        document.getElementById("sstar5").classList.add("checked");
    }
    // would put the chem summary update here if ever properly implementing! - use bar2
    var i=0;
    var sum=0;
    const l = playerspicked.length;
    console.log("l = "+l);
    while (i<l) {
        sum += playerratings[(playerspicked[i])];
        console.log(sum);
        i++;
    }
    var rating = Math.round((sum/l)+100);
    const summary_score = (rating+"/200");
    document.getElementById("summary-score-val").innerHTML = summary_score;
    var transfer_budget=0;
    transfer_budget = randgenerate(10000,1000000) + Math.abs((100-rating)*10000);
    document.getElementById("transfer-budget-val").innerHTML = "$"+transfer_budget+".00";
}
