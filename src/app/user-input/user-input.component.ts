import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  enteredInitialInvestment = signal('0');
  enteredMonthlyInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  duration = signal('10');

  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment(),
      monthlyInvestment: +this.enteredMonthlyInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.duration(),
    });

    this.enteredInitialInvestment.set('0');
    this.enteredMonthlyInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.duration.set('5');
  }
}
