import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import PlanListItem from './PlanListItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { EditPlanDialog, DeletePlanDialog } from './EditPlanDialog'
import { planType } from './propTypes'

/**
 * @author Yiyang Xu
 */
class PlanList extends React.Component {
  state = {
    dialogOpen: false,
    anchorMenuEl: null,
    alertDialogOpen: false,
    currentItem: null
  }
  handleClose = (form, isUpdate) => {
    this.setState({ dialogOpen: false })
    if (form) {
      if (!isUpdate) this.props.onAddPlan(form.title, form.content, form.timeRange, false)
      else this.props.onUpdatePlan(this.state.currentItem.id, form.title, form.content, form.timeRange, false)
    }
  }
  handleOpen = dialogName => () => {
    this.setState({ [dialogName]: true })
  }

  handleMenuClose = () => {
    this.setState({ anchorMenuEl: null })
  }

  handleMenuOpen = plan => event => {
    this.setState({ anchorMenuEl: event.currentTarget, currentItem: plan })
    this.editDialog.setCurPlan(plan)
  }

  render() {
    let { plans, classes, onDeletePlan } = this.props
    let { anchorMenuEl } = this.state
    return (
      <div>
        <div className={classes.titleContainer}>
          <Typography variant="h5" color="primary">
            计划列表
          </Typography>
          <Button variant="fab" color="primary" mini onClick={this.handleOpen('dialogOpen')}>
            <AddIcon />
          </Button>
        </div>
        <List>
          {plans.map((item, index) => {
            return <PlanListItem onClickMenu={this.handleMenuOpen(item)} plan={item} key={item.id} />
          })}
        </List>
        <EditPlanDialog open={this.state.dialogOpen} onClose={this.handleClose} ref={el => (this.editDialog = el)} />
        <DeletePlanDialog
          open={this.state.alertDialogOpen}
          onClose={needDelete => {
            this.setState({ alertDialogOpen: false })
            if (needDelete) {
              onDeletePlan(this.state.currentItem.id)
            }
          }}
        />
        <Menu
          id="edit-menu"
          anchorEl={anchorMenuEl}
          open={Boolean(anchorMenuEl)}
          onClose={() => {
            this.handleMenuClose()
            this.editDialog.resetPlan()
          }}
        >
          <MenuItem
            onClick={() => {
              this.handleMenuClose()
              this.handleOpen('dialogOpen')()
            }}
          >
            编辑
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleMenuClose()
              this.handleOpen('alertDialogOpen')()
            }}
          >
            删除
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

PlanList.propTypes = {
  plans: PropTypes.arrayOf(planType),
  onAddPlan: PropTypes.func.isRequired,
  onDeletePlan: PropTypes.func.isRequired,
  onUpdatePlan: PropTypes.func.isRequired
}

const styles = {
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
export default withStyles(styles)(PlanList)
