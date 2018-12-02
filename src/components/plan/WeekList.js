import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

/**
 * @author Yiyang Xu
 */
class WeekList extends React.Component {
  state = {
    expand: true
  }

  handleExpand = () => {
    this.setState(state => ({ expand: !state.expand }))
  }

  render() {
    let { weeks, setWeek, selectedWeek } = this.props
    return (
      <div style={{ marginBottom: 20 }}>
        <Typography variant="h5" color="primary">
          周计划
          <IconButton onClick={this.handleExpand}>
            {this.state.expand ? <ExpandLess fontSize={'small'} /> : <ExpandMore fontSize={'small'} />}
          </IconButton>
        </Typography>
        <div>
          <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
            <List>
              {weeks.map((week, index) => (
                <ListItem key={index.toString()} button onClick={setWeek(index)} selected={selectedWeek === index}>
                  <ListItemText primary={`第 ${week} 周`} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      </div>
    )
  }
}

WeekList.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.number).isRequired,
  setWeek: PropTypes.func.isRequired,
  selectedWeek: PropTypes.number.isRequired
}
const styles = {}
export default withStyles(styles)(WeekList)
