import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
class PlanListItem extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }
  render() {
    let { content, time } = this.props
    return (
      <ListItem style={{ maxWidth: 700 }}>
        <ListItemText primary={content} secondary={time} />
      </ListItem>
    )
  }
}

export default PlanListItem
