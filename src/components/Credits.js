import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
	constructor() {
		super();
		this.state = {
			newCredit: {
				description: '',
				amount: 0,
				date: '',
			}
		};
	}
	
	handleChange = (e) => {
		const updatedCredit = {...this.state.newCredit};
		const inputField = e.target.name;
		const inputValue = e.target.value;
		updatedCredit[inputField] = inputValue;	
		this.setState({newCredit: updatedCredit});
	}

  handleSubmit = (e) => {
    e.preventDefault()
	var credit = {...this.state.newCredit};
	credit.date = new Date().toISOString();
	credit.amount = Number(credit.amount);
    this.props.addCredit(credit);
    this.setState({newCredit: {description: '', amount: 0, date: ''}});
  }
	
  render() {
	const credits = (this.props.credits || []).map((item, index) => <tr key={item.id}><td>{item.description}</td><td>{item.amount}</td><td>{item.date}</td></tr>);
	const accountBalance = this.props.accountBalance;

    return (
        <div>
          <h1>Credits</h1>
		  <form onSubmit={this.handleSubmit}>
		  <table>
			<thead>
				<tr><th>Description</th><th>Amount</th><th>Date</th></tr>
			</thead>
			<tbody>
			{credits}
			</tbody>
			<tfoot>
				<tr>
					
						<td><input type='text' name='description' onChange={this.handleChange} value={this.state.newCredit.description} /></td>
						<td><input type='number' name='amount' onChange={this.handleChange} value={this.state.newCredit.amount} /></td>
						<td><button disabled={!this.state.newCredit.description || !this.state.newCredit.amount}>Add Debit</button></td>
					
				</tr>
			</tfoot>
		  </table>
		  </form>
		  <AccountBalance accountBalance={accountBalance}/>
		  <Link to="/">Return to Home</Link>
        </div>
    );
  }
}

export default Credits;