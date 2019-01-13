import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  containerView: {
    backgroundColor: 'gray',
    marginVertical: Metrics.marginVertical,
    flex: 1
  },
  outerList: {
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  outerListItem: {
    flex: 1,
    paddingHorizontal: Metrics.marginHorizontal,
    borderBottomWidth: 1
  },
  outerListButton: {
    paddingVertical: Metrics.doubleBaseMargin
  },
  innerList: {
  },
  titleText: {
    ...Fonts.style.normal
  },
  subtitleText: {
    ...Fonts.style.small
  }
})
