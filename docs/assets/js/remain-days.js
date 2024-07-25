const fes_start_date = new Date(2024, 9-1, 22);

document.addEventListener("DOMContentLoaded", (event) => {
    const remain_days = Math.floor((fes_start_date.getTime() - Date.now()) / (24*60*60*1000));
    document.getElementById("days-count-down").textContent = remain_days.toString();
});