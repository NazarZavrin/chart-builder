"use strict"
// 931 * 407
import "./addEventListenerN and removeEventListenerN.js";
import getChartBlockNum from "./getChartBlockNum.js";

// console.log(window.innerWidth);
// console.log(window.innerHeight);
// let wrapper = document.querySelector(".wrapper");
let chartBlocksContainer = document.querySelector(".chart-blocks");

// let chartButtons = chartBlocksContainer.getElementsByClassName("chart-buttons");
// let actionButtons = chartBlocksContainer.getElementsByClassName("action-buttons");

// let charts = document.getElementsByClassName("chart");

const inputDataWrapper = document.querySelector(".input-data-wrapper");
let dataInputs = document.getElementsByClassName("input-function__output")[0];
const inputDataBtns = document.querySelector(".input-data-block__btns");


let createChartBlockBtn = document.querySelector(".create-chart-block-btn");
let chartBlockHTML = `
            <div class='chart-buttons'>
                <div></div>
                <div class='add-chart-btn'></div>
            </div>
            <div class='canvas'></div>
            <div class='action-buttons'>
                <div class='remove-chart-block-btn'>
                    <div></div><div></div>
                </div>
                <div class='zoom-in-btn'></div>
                <div class='zoom-out-btn'></div>
            </div>
        `;

let state = {
    chartsBlocks: [],
};

class Chart {
    constructor() {
        let chartBlockElement = document.createElement("div");
        chartBlockElement.classList.add("chart-block");
        chartBlockElement.insertAdjacentHTML("beforeend", chartBlockHTML);
        chartBlocksContainer.append(chartBlockElement);

        let chartButtons = chartBlockElement.getElementsByClassName("chart-buttons")[0];
        chartButtons.addEventListener("pointerup", event => {
            inputData(event.target.closest(".chart-block"));
        })
        let actionButtons = chartBlockElement.getElementsByClassName("action-buttons")[0];
        this.removeActiveButtons = actionButtons.addEventListenerN("pointerup", event => {
            if (event.target.closest(".remove-chart-block-btn")){
                this.removeChart(event);
            }
        })

        chartBlockElement.querySelector(".canvas").textContent = String(Date.now()).slice(-3);
        this.func = inputData(chartBlockElement);
        state.chartsBlocks.push(this);
        // console.log(state);
        
    }
    removeChart(event) {
        console.log("removeChart");
        this.removeActiveButtons();
        let chart = chartBlocksContainer.children[getChartBlockNum(event, chartBlocksContainer)];
        chart.addEventListener('transitionend', event => {
            setTimeout(() => event.target.remove(), 250);
        }, {"once": true});
        chart.style.transform = "scale(0)";
        state.chartsBlocks = state.chartsBlocks.filter(item => item !== this);
        createChartBlockBtn.style.display = "flex";
    }
}

createChartBlockBtn.addEventListener("pointerup", event => {
    if (state.chartsBlocks.length === 4) {
        return;
    }
    if (state.chartsBlocks.length === 3) {
        createChartBlockBtn.style.display = "none";
        
    }
    new Chart();
    
})

function inputData(chartBlock){
    // document.body.style.overflow = "hidden";
    document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + "px";
    // ↑ ↓ !!!!!!!!!!!!!
    console.log("Ширина полосы прокрутки: " + document.body.style.paddingRight);
    inputDataWrapper.style.top = window.scrollY + "px";
    inputDataWrapper.classList.add("active");
    // let symbolTyped = false;
    let disableButtons = inputDataBtns.addEventListenerN("pointerdown", event => {
        let canvas = chartBlock.getElementsByClassName("canvas")[0];
        if (event.target.closest(".build-btn")) {
            canvas.textContent = inputFuncOutput.textContent;
            closeDataInput(removeKeyboard, disableInputFuncButtons);
        } else if (event.target.closest(".cancel-btn")){
            canvas.textContent = String(Date.now()).slice(-3);
            closeDataInput(removeKeyboard, disableInputFuncButtons);
            
        }
    })
    // let removeKeyboard = inputFunction(inputFuncOutput.getElementsByClassName("output__text")[0]);
    
    
}

function closeDataInput(...functions){
    functions.forEach(func => func());
    inputDataWrapper.classList.remove("active");
    inputDataWrapper.addEventListener('transitionend', event => {
        inputDataWrapper.style.top = "0px";
    }, {"once": true});
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";// !!!!!!!!!!!!!
}

