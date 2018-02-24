import React, { Component } from 'react'
import './App.css';
import { Header, List,Grid, Search, Progress } from 'semantic-ui-react'
import Image from './Image.js'
export default class SearchBar extends Component{


  render(){
    return(
      <Grid className="container"  columns={1} relaxed>
        <Grid.Column>
          <Search fluid input={{ fluid: true }} className="search">nothing is here </Search>
        </Grid.Column>
        <Grid  columns={3}>
          <Grid.Column align="center">
            Nexus 6P
            <Image />
          </Grid.Column>
          <Grid.Column>
            Battery<Progress indicating value='5' total='10' progress='ratio'></Progress>
            Memory<Progress indicating value='8' total='10' progress='ratio'></Progress>
            Storage<Progress indicating  value='8' total='10' progress='ratio'></Progress>
            Screen Size<Progress indicating  value='9' total='10' progress='ratio'></Progress>
            Rating<Progress indicating  value='8' total='10' progress='ratio'></Progress>
          </Grid.Column>
          <Grid.Column >
            <Header as='h1'>Advantage</Header>
              <List bulleted>
                <List.Item>Gaining Access</List.Item>
                <List.Item>Inviting Friends</List.Item>
                <List.Item>asdasdf</List.Item>
              </List>
            <Header as='h1'>Disadvantage</Header>
              <List bulleted>
                <List.Item>Gaining Access</List.Item>
                <List.Item>Inviting Friends</List.Item>
                <List.Item>adsfasdf</List.Item>
              </List>
          </Grid.Column>
        </Grid>
      </Grid>
    )
  }
}
