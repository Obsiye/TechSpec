import React, { Component } from 'react'
import './App.css';
import { Image } from 'semantic-ui-react'
//import myImage from './assets/images/Nexus_6P.png'

export default class Images extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <Image src={this.props.src} size='large' />
    )
  }
}
