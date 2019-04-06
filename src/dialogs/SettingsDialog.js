import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import AccountTab from '../tabs/settings/AccountTab';
import AppearanceTab from '../tabs/settings/AppearanceTab';

class SettingsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0
    };
  }

  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.props.onClose();
    }
  };

  changeTab = (event, value) => {
    this.setState({
      selectedTab: value
    });
  };

  render() {
    // Properties
    const { open, user, isVerifyingEmailAddress, colors, types, primaryColor, secondaryColor, type } = this.props;

    // Events
    const { onClose, onVerifyEmailAddressClick, onPrimaryColorChange, onSecondaryColorChange, onTypeChange, onResetClick } = this.props;

    const { selectedTab } = this.state;

    const DynamicTab = withStyles({
      label: {
        color: type === 'light' ? '#000000' : '#ffffff'
      }
    })(Tab);

    return (
      <Dialog open={open} onClose={onClose} onKeyPress={this.handleKeyPress}>
        <DialogTitle>Settings</DialogTitle>

        <Tabs onChange={this.changeTab} value={selectedTab} variant="fullWidth">
          <DynamicTab label="Account" />
          <DynamicTab label="Appearance" />
        </Tabs>

        <DialogContent>
          {selectedTab === 0 &&
            <AccountTab user={user} isVerifyingEmailAddress={isVerifyingEmailAddress} onVerifyEmailAddressClick={onVerifyEmailAddressClick} />
          }

          {selectedTab === 1 &&
            <AppearanceTab
              colors={colors}
              types={types}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              type={type}
              onPrimaryColorChange={onPrimaryColorChange}
              onSecondaryColorChange={onSecondaryColorChange}
              onTypeChange={onTypeChange}
            />
          }
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" variant="outlined" onClick={() => { setTimeout(onResetClick, 137.5) }}>Reset</Button>
          <Button color="primary" variant="contained" onClick={onClose}>OK</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isVerifyingEmailAddress: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  onClose: PropTypes.func.isRequired,
  onVerifyEmailAddressClick: PropTypes.func.isRequired,
  onPrimaryColorChange: PropTypes.func.isRequired,
  onSecondaryColorChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired
};

export default SettingsDialog;