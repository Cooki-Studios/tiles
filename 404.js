let ver = window.location.href.split("/")[window.location.href.split("/").length-1].split("?")[0]

if (ver.includes(".html")) {
    ver = ver.slice(0, -5);
}

const sorry = document.getElementById("sorry");

sorry.innerText = "Sorry, but there isn't a Tiles " + ver + " that exists in your current universe.";

const sorryMsg = document.createElement("span");
sorryMsg.classList.add("sometype-mono-ui");
sorry.appendChild(sorryMsg);

let i = 0;
let str = "Please click the button below";

let i2 = 0;
let str2 = "to prevent a paradox.";

let blinkingChar = false;
let blinkCharTimeout;

function blinkChar() {
    if (sorryMsg.innerHTML[sorryMsg.innerHTML.length-1] === "|") {
        sorryMsg.innerHTML = sorryMsg.innerHTML.slice(0, -1);
        sorryMsg.innerHTML += str.charAt(i) + "<span class='hidden'>|</span>";
    } else {
        sorryMsg.innerHTML = sorryMsg.innerHTML.slice(0, -1);
        sorryMsg.innerHTML = sorryMsg.innerHTML.slice(0, -"<span class='hidden'>|</span>".length)
        sorryMsg.innerHTML += str.charAt(i) + "|";
    }

    if (blinkingChar) {
        blinkCharTimeout = setTimeout(blinkChar, (1/3)*1000);
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function typing() {
    if (i < str.length) {
        sorryMsg.innerHTML = sorryMsg.innerHTML.slice(0, -1);
        sorryMsg.innerHTML += str.charAt(i) + "|";
        i++;
        setTimeout(typing, Math.max(Math.random(), 0.5) * 100);
    } else {
        if (i2 === 0) {
            sorryMsg.innerHTML.slice(0, -1);
            blinkingChar = true;
            blinkChar();
            await delay(2500);

            if (blinkCharTimeout) {
                clearTimeout(blinkCharTimeout);
                blinkingChar = false;
            }


            if (sorryMsg.innerHTML[sorryMsg.innerHTML.length-1] === "|") {
                sorryMsg.innerHTML = sorryMsg.innerHTML.slice(0, -1);
            }

            sorryMsg.innerHTML += " <br> ";
            setTimeout(typing, Math.max(Math.random(), 0.5) * 500);
            i2++;
        } else {
            if (i2 < str2.length) {
                sorryMsg.innerHTML = sorryMsg.innerHTML.slice(0, -1)
                sorryMsg.innerHTML += str2.charAt(i2) + "|";
                i2++;
                setTimeout(typing, Math.max(Math.random(), 0.5) * 100);
            } else {
                blinkingChar = true;
                blinkChar();
            }
        }
    }
}

if (ver === "404") {
    sorryMsg.innerHTML += "<br> ";

    setTimeout(typing, 2500);
}