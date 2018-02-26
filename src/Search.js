import React, { Component } from "react";
import "./App.css";
import _ from "lodash";
import ProgressBar from "./ProgressBar";
import {
  Header,
  List,
  Search,
  Image,
  Button,
  Divider,
  Transition,
  Tab
} from "semantic-ui-react";

const source = require("./assets/data/data.json");

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: [],
      value: "",
      visible: true,
      selectedItem: undefined
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => {
    this.setState({ selectedItem: result.item });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const val = this.state.value.replace(/\s+/g, ""); // ignore whitespace
      console.log(val);
      const re = new RegExp(val, "i");
      const isMatch = result => re.test(result.name.replace(/\s+/g, ""));
      //  const check = _.filter(source, isMatch);
      //  console.log(check);
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 500);
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  getSelectedItemDisAdv() {
    if (!this.state.selectedItem) return [];
    else
      return _.map(this.state.selectedItem.disadvantages, (value, key) => ({
        name: key,
        value: value
      }));
  }

  getSelectedItemAdv() {
    if (!this.state.selectedItem) return [];
    else
      return _.map(this.state.selectedItem.advantages, (value, key) => ({
        name: key,
        value: value
      }));
  }

  getSelectedItemStats() {
    if (!this.state.selectedItem) return [];
    else
      return _.map(this.state.selectedItem.stats, (value, key) => ({
        name: key,
        value: value
      }));
  }

  render() {
    const panes = [
      {
        menuItem: "Tab 1",
        render: () => (
          <Tab.Pane>
            {" "}
            <div className="spec show">
              {this.getSelectedItemStats().map(x => (
                <ProgressBar name={x.name} value={x.value} />
              ))}
            </div>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Tab 2",
        render: () => (
          <Tab.Pane>
            <div className="spec hide">test</div>
          </Tab.Pane>
        )
      }
    ];
    const { isLoading, value, results } = this.state;
    return (
      <div className="container">
        {/* SEARCH BAR */}
        <div className="searchBar">
          <Search
            className="search"
            input={{ fluid: true }}
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
              {_.get(this.state, "selectedItem.name", "")}
              <Image
                src={_.get(this.state, "selectedItem.image", "")}
                size="medium"
              />
            </div>

            {/* PROGRESS BARS */}
            {/*place slider here for more details*/}

            <button
              className="expand"
              content={this.state.visible ? "Hide" : "Show"}
              onClick={this.toggleVisibility}
            >
              +
            </button>
            <Divider hidden />
            <Transition
              visible={!this.state.visible}
              animation="fade"
              duration={200}
            >
              <div className="spec">
                5.8-inch (6.2-inch for the S8 Plus) 1440 x 2960 pixel 4K
                resolution Super AMOLED display. Octa-core Qualcomm Snapdragon
                835 chip for US market (Exynos 8895 chip for international
                market) Adreno 540 GPU. Android 7.0 Nougat. 4GB RAM. 64GB/128GB
                storage.
              </div>
            </Transition>
            <Transition
              visible={this.state.visible}
              animation="fade"
              duration={200}
            >
              <div className="spec">
                {this.getSelectedItemStats().map(x => (
                  <ProgressBar name={x.name} value={x.value} />
                ))}
              </div>
            </Transition>
            {/*

                        <div className="spec hide">test</div>
                        <div className="spec show">
                            {this.getSelectedItemStats().map(x => (
                                <ProgressBar
                                    name={x.name}
                                    value={x.value}/>
                            ))}
                        </div>
*/}
            {/* ADVANTAGES/DISADVANTAGES */}
            <div className="details">
              <Header as="h1">Advantage</Header>
              <List bulleted>
                {this.getSelectedItemAdv().map(x => (
                  <List.Item>{x.value}</List.Item>
                ))}
              </List>
              <Header as="h1">Disadvantage</Header>
              <List bulleted>
                {this.getSelectedItemDisAdv().map(x => (
                  <List.Item>{x.value}</List.Item>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
