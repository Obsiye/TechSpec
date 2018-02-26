
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css';
import {Progress} from 'semantic-ui-react'

export default class ProgressBar extends Component {
    render() {
        return (
            <div>
            {this.props.name}
                <Progress indicating value={this.props.value} total='10' progress='ratio'/>
            </div>
        )
    }

}

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};
