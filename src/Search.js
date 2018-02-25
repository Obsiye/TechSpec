
import React, {Component} from 'react'
import './App.css';
import _ from 'lodash'
import ProgressBar from './ProgressBar'
import {Header, List, Search, Image} from 'semantic-ui-react'

const source = require('./assets/data/data.json');

export default class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            results: [],
            value: '',
            selectedItem: undefined
        }
    }

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

    handleResultSelect = (e, {result}) => { this.setState({selectedItem: result.item}) }

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value})

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
    };

    getSelectedItemStats() {
        if (!this.state.selectedItem)
            return [];
        else
            return _.map(this.state.selectedItem.stats, (value, key) => ({ name: key, value: value }))
    }

    render() {
        const {isLoading, value, results} = this.state;
        return (
            <div className="container">

                {/* SEARCH BAR */}
                <div className="searchBar">
                    <Search className="search"
                            input={{fluid: true}}
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={this.handleSearchChange}
                            results={results.map(x => ({
                                title: x.name,
                                image: x.image,
                                item: x
                            }))}
                            value={value}
                            {...this.props}
                            placeholder="Find phone..."
                            fluid
                    />
                </div>

                {/* INFO */}
                <div className="gridDetails">
                    <div className="detailsContainer">

                        {/* IMAGE */}
                        <div className="details" align="center">
                            {_.get(this.state,'selectedItem.name',"")}
                            <Image src={_.get(this.state,"selectedItem.image","")} size='medium'/>
                        </div>

                        {/* PROGRESS BARS */}
                        <div className="spec">
                            {this.getSelectedItemStats().map(x => (
                                <ProgressBar
                                    key={x.name}
                                    value={x.value}/>
                            ))}
                        </div>

                        {/* ADVANTAGES/DISADVANTAGES */}
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
