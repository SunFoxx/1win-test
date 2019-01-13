import React, { Component } from 'react'
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SportListActions from '../Redux/SportListRedux'

import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: null
    }
  }

  renderList () {
    const {
      list,
      listError,
      listFetching
    } = this.props
    if (listError) {
      return (
        <Text style={[styles.titleText, { color: 'red' }]}>
          Some error occurred during receiving a list
        </Text>
      )
    }
    return (
      <FlatList
        renderItem={({item}) => this.renderListItem(item)}
        data={list}
        keyExtractor={(item) => item.name}
        style={styles.outerList}
        extraData={{
          ...this.state,
          listFetching
        }}
      />
    )
  }

  renderListItem (data) {
    const { name, id } = data
    const { loadSublist, sublists } = this.props
    const { selectedIndex: oldIndex } = this.state
    const sublistItem = sublists[id]
    return (
      <View
        style={styles.outerListItem}
      >
        <TouchableOpacity
          onPress={() => {
            if (!sublistItem) {
              loadSublist(id)
            }
            this.setState({ selectedIndex: (oldIndex && oldIndex === id) ? null : id })
          }}
          style={styles.outerListButton}
        >
          <Text style={styles.titleText}>
            {name}
          </Text>
        </TouchableOpacity>
        {this.renderSublist(id)}
      </View>
    )
  }

  renderSublist (id) {
    const { sublists } = this.props
    const { selectedIndex } = this.state
    if (selectedIndex !== id) return null
    const sublistItem = sublists[id]
    if (sublistItem.fetching) {
      return (<ActivityIndicator />)
    }
    if (sublistItem.error) {
      return (
        <Text
          style={[styles.subtitleText, {color: 'red'}]}
        >
          Sublist fetching failed
        </Text>
      )
    }
    if (sublistItem.list) {
      return (
        <FlatList
          renderItem={({item}) => (<Text style={styles.subtitleText}>{item}</Text>)}
          data={sublistItem.list}
          style={styles.innerList}
          keyExtractor={(item) => item}
        />
      )
    }
    return null
  }

  renderLoader () {
    const {
      listFetching
    } = this.props
    return listFetching ? (<ActivityIndicator />) : null
  }

  render () {
    return (
      <View style={styles.containerView}>
        {this.renderLoader()}
        {this.renderList()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.sportList.list,
  listFetching: state.sportList.fetching,
  listError: state.sportList.error,
  sublists: state.sportList.sublists
})

LaunchScreen.propTypes = {
  listFetching: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  listError: PropTypes.oneOf([
    PropTypes.shape({}),
    PropTypes.bool
  ]),
  loadSublist: PropTypes.func.isRequired,
  sublists: PropTypes.shape({}).isRequired
}

const mapDispatchToProps = (dispatch) => ({
  loadSublist: (id) => dispatch(SportListActions.requestSublist(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
