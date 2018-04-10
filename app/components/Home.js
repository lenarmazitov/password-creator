// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import FullScreenDialog from "./FullScreenDialog"
import generator from "../utils/generator"
import {Divider, List, ListItem, MenuItem, Paper, RaisedButton, SelectField, Snackbar, TextField} from "material-ui"
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import GenerateIcon from 'material-ui/svg-icons/action/build'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      salt: '',
      encryptionCycles: 10,
      password: '',
      openPasswordInfoDialog: false,
      openCopiedSnack: false,
    }
    this.generate.bind(this);
  }

  handleChange = name => (event, index, value) => {
    this.setState({ [name]: value });
  };

  handleChangeText = name => (event, value) => {
    this.setState({ [name]: value });
  };

  generate() {
    generator(this.state.name, this.state.salt, this.state.encryptionCycles).then((password) => {
      this.setState({
        password: password,
        openPasswordInfoDialog: true,
      })
    })
  }

  render() {
    const nameLabel = 'Придумайте мнемоническое название для вашего пароля. ВНИМАНИЕ! Очень важно точно запомнить название вашего пароля.'
    const saltLabel = 'Придумайте соль для того чтобы ваш пароль был уникальным. Солью может быть любое слово, либо какой-нибудь ваш личный пароль, который вы точно не забудете. Зная соль и название вашего пароля вы можете восстановить ваш сгенерированный пароль.'

    return (
      <Paper className={styles.paper}>
        <div className={styles.formControl}>
          <TextField id="password-name" onChange={this.handleChangeText('name')} hintText={"Название пароля"} />
          <div className={styles.hint}>{nameLabel}</div>
        </div>
        <div className={styles.formControl}>
          <TextField id="password-salt" onChange={this.handleChangeText('salt')} hintText={"Соль"} />
          <div className={styles.hint}>{saltLabel}</div>
        </div>
        <div className={styles.formControl}>
          <SelectField
            id="encryptionCycles"
            value={this.state.encryptionCycles}
            onChange={this.handleChange('encryptionCycles')}
          >
            <MenuItem value={1} primaryText="1 цикл шифрования" />
            <MenuItem value={10} primaryText="10 циклов шифрования" />
            <MenuItem value={100} primaryText="100 циклов шифрования" />
            <MenuItem value={1000} primaryText="1000 циклов шифрования" />
          </SelectField>
          <div className={styles.hint}>Чем больше циклов шифрования тем сложнее будет подобрать вашу соль c помощью этого инструмента. Это не защитит от подбора пароля брутфорсом. ВНИМАНИЕ! Пароль ЗАВИСИТ от этого параметра.</div>
        </div>
        <div style={{marginTop: 20}}>
          <RaisedButton
            onClick={this.generate.bind(this)}
            primary={true}
            icon={<GenerateIcon />}
            label="Сгенерировать"
          />
        </div>
        <FullScreenDialog open={this.state.openPasswordInfoDialog} onClose={() => {
          this.setState({openPasswordInfoDialog: false});
        }} title="Информация по вашему паролю">
          <List>
            <ListItem primaryText="Название вашего пароля" secondaryText={this.state.name || "#none#"} />
            <Divider />
            <ListItem primaryText="Соль к вашему паролю" secondaryText={this.state.salt || "#none#"} />
            <Divider />
            <ListItem primaryText="Циклы шифрования" secondaryText={this.state.encryptionCycles} />
            <Divider />
            <ListItem secondaryTextLines={2} primaryText="Ваш пароль" secondaryText={
              <div style={{height: 50}}>
                <TextField id="passwordField" value={this.state.password || "#none#"} style={{ marginRight: 10 }} />
                <RaisedButton
                  label="Копировать"
                  primary={true}
                  icon={<CopyIcon />}
                  onClick={() => {
                  let passwordField = document.getElementById("passwordField");
                  passwordField.focus();
                  passwordField.select();
                  document.execCommand('copy');
                  this.setState({ openCopiedSnack: true });
                }} />
              </div>
            } />
          </List>
          <Snackbar
            open={this.state.openCopiedSnack}
            onRequestClose={() => {this.setState({openCopiedSnack: false})}}
            autoHideDuration={3000}
            message={<span id="message-id">Скопировано</span>}
          />
        </FullScreenDialog>
      </Paper>
    );
  }
}

Home.propTypes = {
};
