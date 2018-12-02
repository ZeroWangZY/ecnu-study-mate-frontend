import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { planType } from './propTypes'
import moment from 'moment'

/**
 * @author Yiyang Xu
 */
class PlanListItem extends React.PureComponent {
  render() {
    const { content, title, timeRange, id } = this.props.plan
    const { onClickMenu, classes } = this.props
    let formattedTime = timeRange.map(item => moment(item).format('M月D日 HH:mm'))

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton onClick={onClickMenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={formattedTime.join(' ~ ')}
        />
        <CardContent>
          <Typography variant="body1">{content}</Typography>
        </CardContent>
      </Card>
    )
  }
}

PlanListItem.propTypes = {
  plan: planType,
  onClickMenu: PropTypes.func.isRequired
}

const styles = {
  card: {
    marginTop: 10,
    marginBottom: 20
  }
}
export default withStyles(styles)(PlanListItem)
