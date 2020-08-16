import React, { Component } from "react";

export default class Messenger extends Component {
  constructor() {
    super()
    this._isMounted = false;
    this.state = {
      mainMessage: "",
      codeletters: "&_#*+%?£@§$",
      current_length: 0,
      message: 0,
      fadeBuffer: false,
  
      messages: []
    }
  }

  componentDidMount() {
    this._isMounted = true;
    setTimeout(this.animateIn, 200)
  }
  generateRandomString = length => {
    let random_text = ""
    while (random_text.length < length) {
      random_text += this.state.codeletters.charAt(
        Math.floor(Math.random() * this.state.codeletters.length)
      )
    }
    return random_text;
  }
  animateIn = () => {
    if ((this.props.news[0] && this.state.current_length < this.props.news[this.state.message].length) && this._isMounted) {
      this.setState({ current_length: this.state.current_length + 2 })
      if (this.state.current_length > this.props.news[this.state.message].length) {
        this.setState({ current_length: this.props.news[this.state.message].length })
      }
      const message = this.generateRandomString(this.state.current_length)
      this.setState({ mainMessage: message })
      setTimeout(this.animateIn, 10)
    } else {
      setTimeout(this.animateFadeBuffer, 10)
    }
  }
  animateFadeBuffer = () => {
    if (this._isMounted) {
      if (this.props.news[0] && this.state.fadeBuffer === false) {
        this.setState({ fadeBuffer: [] });
        for (let i = 0; i < this.props.news[this.state.message].length; i++) {
          this.state.fadeBuffer.push({
            c: Math.floor(Math.random() * 12) + 1,
            l: this.props.news[this.state.message].charAt(i)
          })
        }
      }
      let do_cycles = false
      let message = ""
      for (let i = 0; i < this.state.fadeBuffer.length; i++) {
        let fader = this.state.fadeBuffer[i];
        if (fader.c > 0) {
          do_cycles = true;
          fader.c--;
          message += this.state.codeletters.charAt(
            Math.floor(Math.random() * this.state.codeletters.length)
          )
        } else {
          message += fader.l;
        }
      }
      this.setState({ mainMessage: message });
      if (do_cycles === true) {
        setTimeout(this.animateFadeBuffer, 100);
      } else {
        setTimeout(this.cycleText, 1500);
      }
    }
  }
  cycleText = () => {
    if (this._isMounted) {
      this.setState({ message: this.state.message + 1 });
      if (this.props.news[0] && this.state.message >= this.props.news.length) {
        this.setState({ message: 0 });
      }
      this.setState({ current_length: 0 });
      this.setState({ fadeBuffer: false });
      this.setState({ mainMessage: "" });
      setTimeout(this.animateIn, 200);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
        <span style={{color: "#363537", fontWeight: "400"}} className="messenger BreakingNewsLine">{this.state.mainMessage}</span>
    ) 
  }
}