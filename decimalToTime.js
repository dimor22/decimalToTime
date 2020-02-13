let css = `.dtt-target { 
            transition: .5s; 
            background-color: #ffff0061; 
            padding: 5px; 
            font-size: 1.2rem; 
            cursor: pointer; 
            position: relative;
            }
            .dtt-target span{
                display: block;
                position: absolute;
                bottom: -30px;
                left: 0;
                width: 100%;
                background-color: green;
                color:white;
                padding: 3px;
                text-align: center;
            }`;
let head = document.head || document.getElementsByTagName('head')[0];
let style = document.createElement('style');

head.appendChild(style);
style.appendChild(document.createTextNode(css));


function decimalToTime( number ) {
    const decTime = number;

    let decimalNumber = decTime.split(".");

    let totalSeconds = ( decimalNumber[1] * 3600 ) / 1000;

    // git rid of decimal seconds
    totalSeconds = Math.floor( totalSeconds );

    let minutes = totalSeconds / 60;

    // round seconds to two digits only
    minutes = minutes.toFixed(2);

    let leftOverSeconds = minutes.split('.')[1];
    let leftOverMinutes = minutes.split('.')[0];

    if ( leftOverSeconds > 60 ) {
        leftOverSeconds = leftOverSeconds - 60;
        leftOverMinutes = parseInt(leftOverMinutes) + 1;
    }

    return leftOverMinutes + 'm ' + leftOverSeconds + 's';
}

document.addEventListener('mouseover', function (e) {

    if ( e.target.innerText.length < 7) {

        let targetEle = e.target;

        $(targetEle).addClass("dtt-target");

        $(targetEle).on('click', function (e) {
            if ( ! targetEle.children.length > 0 ) {
                let newSpanElement = document.createElement('span');
                targetEle.appendChild( newSpanElement );
                newSpanElement.appendChild( document.createTextNode( decimalToTime(targetEle.innerText ) ) );
            }

        });

        $(targetEle).on('mouseleave', function (e) {
            $('.dtt-target span').remove();
            $(targetEle).removeClass('dtt-target');
        });

    }
});
