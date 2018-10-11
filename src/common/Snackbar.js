import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { setSnackText } from '../redux/actions/app';
import { connect } from 'react-redux'

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class SimpleSnackbar extends React.Component {

    handleClick = () => {
        
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.setText('');
    };

    render() {
        let text = this.props.text;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={text !== ''}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{text}</span>}
                    action={[
                        // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        //   UNDO
                        // </Button>,
                        // <IconButton
                        //   key="close"
                        //   aria-label="Close"
                        //   color="inherit"
                        //   className={classes.close}
                        //   onClick={this.handleClose}
                        // >
                        //   <CloseIcon />
                        // </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    text: state.app.snackbarText,
})

const mapDispatchToProps = dispatch => ({
    setText: (text) => dispatch(setSnackText(text)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SimpleSnackbar));