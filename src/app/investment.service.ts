import { Injectable, signal } from "@angular/core";
import { InvestmentInput } from "./investment-input.model";

@Injectable({ providedIn: 'root' })
export class InvestmentService {
    resultData = signal<{
        month: number;
        interest: number;
        valueEndOfMonth: number;
        monthlyInvestment: number;
        totalInterest: number;
        totalAmountInvested: number;
    }[] | undefined>(undefined);

    calculateInvestmentResults(data: InvestmentInput) {
        const { initialInvestment, monthlyInvestment, expectedReturn, duration } = data;
        const monthlyData = [];
        let investmentValue = initialInvestment;

        for (let i = 0; i < duration; i++) {
            const year = i + 1;
            const interestEarnedInYear = investmentValue * (expectedReturn / 100);
            investmentValue += interestEarnedInYear + monthlyInvestment;
            const totalInterest =
                investmentValue - monthlyInvestment * year - initialInvestment;
            monthlyData.push({
                month: year,
                interest: interestEarnedInYear,
                valueEndOfMonth: investmentValue,
                monthlyInvestment: monthlyInvestment,
                totalInterest: totalInterest,
                totalAmountInvested: initialInvestment + monthlyInvestment * year,
            });
        }
        this.resultData.set(monthlyData);
    }
}