import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Dialog, IconButton, NavigationClose, Toolbar} from "material-ui"
import CloseIcon from 'material-ui/svg-icons/navigation/close'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.PureComponent {

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}
          transition={Transition}
        >
          <AppBar
            title={<span>{this.props.title}</span>}
            onLeftIconButtonClick={this.handleClose}
            iconElementLeft={<IconButton><CloseIcon /></IconButton>}
          />
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default FullScreenDialog;
