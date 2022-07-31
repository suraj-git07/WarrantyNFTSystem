import React, { Component } from 'react'

export default class ModalBody extends Component {
  render() {
    return (
        <div class="wrapper">
        <div class="header">
          <h1>Contact us</h1>
          <p>Do you have a question? Send us a message and we will respond as soon as possible.</p>
        </div>
        <form>
          <h4>Name</h4>
          <input type="text" name="name" />
          <h4>Email</h4>
          <input type="text" name="email" />
          <h4>Message</h4>
          <textarea></textarea>
          <button>Send</button>
        </form>
      </div>
    )
  }
}
