document.addEventListener("DOMContentLoaded", function() {
    updateCopyright();
    showSiteUptime();
});

function updateCopyright() {
    const copyrightElement = document.querySelector('.copyright');
    copyrightElement.innerHTML = '©2021 <i class="fa-fw fas fa-heartbeat card-announcement-animation cc_pointer"></i> By L4Walk';
}

function showSiteUptime() {
    const frameworkInfoElement = document.querySelector('.framework-info');
    const span_dt_dt = document.createElement('span');
    span_dt_dt.style.color = "#fff";
    frameworkInfoElement.innerHTML = '本站已运行';
    frameworkInfoElement.appendChild(span_dt_dt);

    function updateUptime() {
        const BirthDay = new Date("10/31/2021 0:0:0");
        const today = new Date();
        const timeDiff = today - BirthDay;
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        span_dt_dt.innerHTML = `<font style=color:#afb4db>${days}</font> 天 <font style=color:#f391a9>${hours}</font> 时 <font style=color:#fdb933>${minutes}</font> 分 <font style=color:#a3cf62>${seconds}</font> 秒`;

        setTimeout(updateUptime, 1000);
    }

    updateUptime();
}
