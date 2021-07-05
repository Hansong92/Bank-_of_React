import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
	constructor() {
		super();
		this.state = {
			newDebit: {
				description: '',
				amount: 0,
				date: '',
			}
		};
	}
	
	handleChange = (e) => {
		const updatedDebit = {...this.state.newDebit};
		const inputField = e.target.name;
		const inputValue = e.target.value;
		updatedDebit[inputField] = inputValue;	
		this.setState({newDebit: updatedDebit});
	}

  handleSubmit = (e) => {
    e.preventDefault()
	var debit = {...this.state.newDebit};
	debit.date = new Date().toISOString();
	debit.amount = Number(debit.amount);
    this.props.addDebit(debit);
    this.setState({newDebit: {description: '', amount: 0, date: ''}});
  }
	
  render() {
	const debits = (this.props.debits || []).map((item, index) => <tr key={item.id}><td>{item.description}</td><td>{item.amount}</td><td>{item.date}</td></tr>);
	const accountBalance = this.props.accountBalance;

    return (
        <div>
          <h1>Debits</h1>
		  <form onSubmit={this.handleSubmit}>
		  <table>
			<thead>
				<tr><th>Description</th><th>Amount</th><th>Date</th></tr>
			</thead>
			<tbody>
			{debits}
			</tbody>
			<tfoot>
				<tr>
					
						<td><input type='text' name='description' onChange={this.handleChange} value={this.state.newDebit.description} /></td>
						<td><input type='number' name='amount' onChange={this.handleChange} value={this.state.newDebit.amount} /></td>
						<td><button disabled={!this.state.newDebit.description || !this.state.newDebit.amount}>Add Debit</button></td>
					
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

export default Debits;