import React from "react";
class Timer extends React.Component {
    constructor() {
        super()
        this.state = {
            time_ready: false
        }
    }

    componentDidMount() {
        var startTime;
        if (localStorage.getItem('startTime')) {
            startTime = localStorage.getItem('startTime');
        } else {
            startTime = Date.now();
            localStorage.setItem('startTime', startTime);
        }
        this.setState({
            startTime: startTime,
        });
        // this.tick()
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        var time = Date.now() - this.state.startTime;
        var days = Math.floor(time / 86400000);
        time -= days * 86400000;
        var hours = Math.floor(time / 3600000);
        time -= hours * 3600000;
        var minutes = Math.floor(time/ 60000);
        time -= minutes * 60000;
        var seconds = Math.floor(time / 1000);
        this.setState({
            seconds: seconds,
            minutes: minutes,
            hours: hours,
            days: days,
            time_ready: true
        });
    }

    render() {
        if (!this.state.time_ready){
            return (
                <span style={{color: "#363537", fontWeight: "400"}}>Loading...</span>
            );
        }
        return (
            <span style={{color: "#363537", fontWeight: "400"}}>{this.state.days.toString().padStart(2,0)}:{this.state.hours.toString().padStart(2,0)}:{this.state.minutes.toString().padStart(2,0)}:{this.state.seconds.toString().padStart(2,0)}</span>
        );
    }
}

export default Timer;
