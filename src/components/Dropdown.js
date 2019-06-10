import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

const styles = theme => ({
		root: {
				position: 'relative',
		},
		paper: {
				position: 'absolute',
				top: 36,
				right: 0,
				left: 0,
		},
		fake: {
				backgroundColor: grey[200],
				height: theme.spacing(1),
				margin: theme.spacing(2),
				// Selects every two elements among any group of siblings.
				'&:nth-child(2n)': {
						marginRight: theme.spacing(3),
				},
		},
});

class ClickAway extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						open: false,
						locationId: this.props.locationId,
						cuisisnes: []
				};
		};

		componentDidMount = async () => {
			  const api_call = await fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${this.state.locationId}`, 
										 								{ headers: { 'Content-Type': 'application/json', "user-key": API_KEY }});

			  const data = await api_call.json();
			  this.setState({ cuisines: data.cuisines });
			  console.log(data);
		};

		handleClick = () => {
				this.setState(state => ({
						open: !state.open
				}));
		};

		handleClickAway = () => {
				this.setState({
						open: false
				});
		};

		render() {
				const { classes } = this.props;
				const { open } = this.state;
				const fake = <div className={classes.fake} />;

				return (
						<div className={classes.root}>
								<ClickAwayListener onClickAway={this.handleClickAway}>
										<div>
												<Button onClick={this.handleClick}>Open menu</Button>
												{open ? (
														<Paper className={classes.paper}>
																{ this.state.cuisines.map(c => {
																	return <div>{ c.cuisine.cuisine_name }</div>
																}) }
														</Paper>
												) : null}
										</div>
								</ClickAwayListener>
						</div>
				);
		}
};


export default withStyles(styles)(ClickAway);