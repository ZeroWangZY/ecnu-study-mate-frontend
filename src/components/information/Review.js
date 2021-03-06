import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ReviewItem from './ReviewItem'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto'
  },
  text: {
    margin: 12
  }
})

function Review(props) {
  const { data } = props

  return (
    <div>
      {data !== null && data !== undefined
        ? data.slice().reverse().map((item, index) => <ReviewItem data={item} key={'aw' + index} />)
        : null}
    </div>
  )
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Review)
