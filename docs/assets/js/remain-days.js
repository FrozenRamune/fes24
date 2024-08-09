const fes_start_date = new Date(2024, 9-1, 22);

console.log(fes_start_date);

document.addEventListener("DOMContentLoaded", (event) => {
    const remain_days = Math.ceil((fes_start_date.getTime() - Date.now()) / (24*60*60*1000));
    console.log(Date.now());
    document.getElementById("days-count-down").textContent = remain_days.toString();
});