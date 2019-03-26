import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class IdSelector extends React.Component {
  handleChange = event => {
    this.props.onCurrentIdChange(event.target.value)
  }

  render() {
    const { classes, studentIdList, currentId } = this.props
    return (
      <div>
        <FormControl className={classes.formControl}>
				<InputLabel>选择学生</InputLabel>

          <Select
            value={currentId === null ? '' : currentId}
            onChange={this.handleChange}
            displayEmpty
            name="currentStudentId"
						className={classes.selectEmpty}

          >
            {studentIdList === null || studentIdList === undefined ? (
              <MenuItem value="">None</MenuItem>
            ) : (
              studentIdList.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>
    )
  }
}

IdSelector.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IdSelector)
