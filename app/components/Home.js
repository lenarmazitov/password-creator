// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import {
  Divider, Fade, InputLabel, List, ListItem, ListItemText, Paper, RaisedButton, Snackbar,
  TextField
} from "material-ui"
import FormControl from "material-ui/es/Form/FormControl"
import Button from "material-ui/es/Button/Button"
import Icon from "material-ui/es/Icon/Icon"
import GenerateIcon from '@material-ui/icons/Build';
import CopyIcon from '@material-ui/icons/ContentCopy';
import Select from "material-ui/es/Select/Select"
import MenuItem from "material-ui/es/Menu/MenuItem"
import FormHelperText from "material-ui/es/Form/FormHelperText"
import FullScreenDialog from "./FullScreenDialog"
import generator from "../utils/generator"

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
        <FormControl fullWidth  margin="normal">
          <TextField id="password-name" onChange={this.handleChange('name')}  label={"Название пароля"} helperText={nameLabel} />
        </FormControl>
        <FormControl fullWidth  margin="normal">
          <TextField id="password-salt" onChange={this.handleChange('salt')} label={"Соль"} helperText={saltLabel} />
        </FormControl>
        <FormControl fullWidth  margin="normal">
          <Select
            value={this.state.encryptionCycles}
            onChange={this.handleChange('encryptionCycles')}
            inputProps={{
              name: 'age',
              id: 'encryptionCycles',
            }}
          >
            <MenuItem value={1}>1 цикл шифрования</MenuItem>
            <MenuItem value={10}>10 циклов шифрования</MenuItem>
            <MenuItem value={50}>50 циклов шифрования</MenuItem>
            <MenuItem value={100}>100 циклов шифрования</MenuItem>
            <MenuItem value={1000}>1000 циклов шифрования</MenuItem>
            <MenuItem value={10000}>10000 циклов шифрования</MenuItem>
          </Select>
          <FormHelperText>Чем больше циклов шифрования тем сложнее будет подобрать вашу соль c помощью этого инструмента. Это не защитит от подбора пароля брутфорсом. ВНИМАНИЕ! Пароль ЗАВИСИТ от этого параметра.</FormHelperText>
        </FormControl>
        <FormControl fullWidth style={{marginTop: 10}}>
          <Button onClick={this.generate.bind(this)} variant="raised" color="primary">
            Сгенерировать <Icon style={{marginLeft: 5}}><GenerateIcon /></Icon>
          </Button>
        </FormControl>
        <FullScreenDialog open={this.state.openPasswordInfoDialog} onClose={() => {
          this.setState({openPasswordInfoDialog: false});
        }} title="Информация по вашему паролю">
          <List component="nav">
            <ListItem>
              <ListItemText primary="Название вашего пароля" secondary={this.state.name || "#none#"} />
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText primary="Соль к вашему паролю" secondary={this.state.salt || "#none#"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Циклы шифрования" secondary={this.state.encryptionCycles} />
            </ListItem>
            <Divider light />
            <ListItem>
              <TextField id="passwordField" value={this.state.password || "#none#"} style={{ marginRight: 10 }} />
              <Button color="secondary" variant="raised" onClick={() => {
                let passwordField = document.getElementById("passwordField");
                passwordField.focus();
                passwordField.select();
                document.execCommand('copy');
                this.setState({ openCopiedSnack: true });
              }}>Копировать <Icon style={{marginLeft: 5}}><CopyIcon /></Icon></Button>
            </ListItem>
          </List>
          <Snackbar
            open={this.state.openCopiedSnack}
            onClose={() => {this.setState({openCopiedSnack: false})}}
            autoHideDuration={3000}
            transition={Fade}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Скопировано</span>}
          />
        </FullScreenDialog>
      </Paper>
    );
  }
}
