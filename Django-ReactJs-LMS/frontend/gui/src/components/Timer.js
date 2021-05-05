import React from 'react';


const Timer = (props) => {

    const { secData } = props;
    const {minsData} = props;

    const [seconds, setSeconds] = React.useState(secData);
    const [minutes, setMinutes] = React.useState(minsData);


    React.useEffect(() => {
        const secTimer = seconds <= 60 && setInterval(() => {
            setSeconds(seconds+1);
        }, 1000)
        seconds === 60 && setSeconds(0)
        seconds === 60 && setMinutes(minutes+1)
        sessionStorage.setItem('seconds', seconds);
        sessionStorage.setItem('minutes', minutes);
        return () => clearInterval(secTimer);
    }, [seconds, minutes])

    return (
        <>
        <b>{`${minutes} : ${seconds}`}</b>
        </>
    )
}

export default Timer;