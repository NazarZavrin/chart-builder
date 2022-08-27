export default function getChartBlockNum(event, chartBlocksContainer) {
    let chart = event.target.closest(".chart-block");
    let index = Array.from(chartBlocksContainer.children).findIndex(child => child === chart);
    return index;
}