import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
/**
 * @author Yiyang Xu
 */
class PlanListItem extends React.PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }
  render() {
    const { classes, content, title, time } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1">{content}</Typography>
          <Typography variant="body2" color="textSecondary">
            {time}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

const styles = {
  card: {
    marginTop: 10,
    marginBottom: 20
  }
}
export default withStyles(styles)(PlanListItem)
