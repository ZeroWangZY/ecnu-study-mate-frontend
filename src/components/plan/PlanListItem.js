import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
/**
 * @author Yiyang Xu
 */
class PlanListItem extends React.PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    time: PropTypes.any
  }
  render() {
    const { classes, content } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            学习提高
          </Typography>
          <Typography variant="h5">{content}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">设置</Button>
        </CardActions>
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
