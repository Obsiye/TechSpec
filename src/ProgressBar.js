import React, { Component } from 'react'
import './App.css';
import { Progress } from 'semantic-ui-react'
//import myImage from './assets/images/Nexus_6P.png'

export default class ProgressBar extends Component{
  constructor(props){
    super(props);
    console.log(props.value)
    console.log(this.props.value)
  }

  render(){

    return(
      <div>
{this.props.value}
<Progress indicating  value='8' total='10' progress='ratio' ></Progress>

</div>
    )
  }
}
