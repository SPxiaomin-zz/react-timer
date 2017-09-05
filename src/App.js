import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      time: 0,
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    clearInterval(this.timer);
    this.setState({
      submitted: false,
    });
  }

  clickHandler(e) {
    e.preventDefault();

    let time = this.props.time;
    this.timer = null;

    let telPattern = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (!telPattern.test(this.telEl.value)) {
      this.telEl.style.border = '1px solid red';
      return ;
    }

    /**
     * ajax code here
     *
     * 1. 如果服务器端验证手机号码无效的话，那么可以调用 this.reset 进行重置回初始状态。
     */

    this.setState({
      submitted: true,
      time: 60,
    });

    this.timer = setInterval(() => {
      time--;

      if (time === 0) {
        this.reset();
      } else {
        this.setState({
          time: time,
        });
      }

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let hintText = this.props.timeHintText.replace(/\{\{(time)\}\}/, this.state.time);

    return (
      <form onSubmit={(e) => {
        this.clickHandler(e);
      }}>
        <input type="tel" ref={tel => this.telEl = tel} placeholder="请输入手机号码" />
        {
          this.state.submitted
            ? <button disabled>{hintText}</button>
            : <button type="submit">获取验证码</button>
        }
      </form>
    );
  }
}

App.defaultProps = {
  time: 60,
  timeHintText: '请耐心等待 {{time}}s'
}

export default App;
