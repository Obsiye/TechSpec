import React, { Component } from 'react'
import './App.css';
import _ from 'lodash'
import ProgressBar from './ProgressBar'
import { Header, List, Search, Progress,Image} from 'semantic-ui-react'
const source = require('./assets/data/data.json');

export default class SearchBar extends Component{

  componentWillMount() {
     this.resetComponent()
   }

   resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

   handleResultSelect = (e, { result }) => this.setState({ name: result.name,src:result.image,s:result.stats, battery:result.stats.battery, weight:result.stats.weight
     ,adv:result.advantages
    })

handleSearchChange = (e, { value }) => {
  this.setState({ isLoading: true, value })

  setTimeout(() => {
    if (this.state.value.length < 1) return this.resetComponent()

    const val = (this.state.value).replace(/\s+/g, '') // ignore whitespace
    const re = new RegExp(val, 'i')
    const isMatch = result => re.test((result.name).replace(/\s+/g, ''))

    this.setState({
      isLoading: false,
      results: _.filter(source, isMatch),
    })
  }, 500)
}

resultRenderer = ({ name,make,stats}) => {
    return <div className="result">{name}</div>
  }

  render(){
     const { isLoading, value, results } = this.state
    return(
      <div className="container">
        <div className="searchBar">

                <Search input={{ fluid: true }} className="search"
                  loading={isLoading}
                  resultRenderer={this.resultRenderer}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  {...this.props}
                  placeholder="Find phone..."
                  fluid
                />

        </div>
        <div className="gridDetails">
          <div className="detailsContainer">
            <div className="details" align="center">
              {this.state.name}
              <Image src={this.state.src} size='medium' />
            </div>
            <div className="spec">
                <ProgressBar value={this.state.s}/>
            </div>
            <div className="details">
              <Header as='h1'>Advantage</Header>
                <List bulleted>
                  <List.Item>{this.state.adv}</List.Item>
                  <List.Item>Inviting Friends</List.Item>
                  <List.Item>asdasdf</List.Item>
                </List>
              <Header as='h1'>Disadvantage</Header>
                <List bulleted>
                  <List.Item>Gaining Access</List.Item>
                  <List.Item>Inviting Friends</List.Item>
                  <List.Item>adsfasdf</List.Item>
                </List>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

/*

Battery <Progress indicating  value={this.state.battery} total='10' progress='ratio' ></Progress>
> 2 years Life <Progress indicating  value={this.state.weight} total='10' progress='ratio' ></Progress>
Memory<Progress indicating percent={1} progress  ></Progress>
Storage<Progress indicating  value='8' total='10' progress='ratio' ></Progress>
Screen Size<Progress indicating  value='9' total='10' progress='ratio' ></Progress>
Rating<Progress indicating  value='8' total='10' progress='ratio' ></Progress>
Rating<Progress indicating  value='8' total='10' progress='ratio' ></Progress>
Rating<Progress indicating  value='8' total='10' progress='ratio' ></Progress>
*/
