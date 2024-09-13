import Page from "./page";

class RetirementCalculatorPage extends Page {
    //Age
    get currentAge() {
        return $(`#current-age`);
    }
    get retirementAge() {
        return $(`#retirement-age`);
    }

    //Income/Savings
    get currentAnnualIncome() {
        return $(`input#current-income`);
    }
    get spouseAnnualIncome() {
        return $(`input#spouse-income`);
    }
    get currentTotalSavings() {
        return $(`input#current-total-savings`);
    }
    get currentAnnualSavings() {
        return $(`input#current-annual-savings`);
    }
    get savingsIncreaseRate() {
        return $(`input#savings-increase-rate`);
    }

    //Social Security income
    get socialSecurityBenefitsToggleYes() {
        return $(`label=Yes`);
    }
    get socialSecurityBenefitsNoButton() {
        return $(`label=No`);
    }

    get singleRadioButton() {
        return $(`label=Single`);
    }
    get marriedRadioButton() {
        return $(`label=Married`);
    }

    get calculateButton() {
        return $(`=Calculate`);
    }

    //Results
    get resultsText() {
        return $(`<h3>`);
    }
    get congratulationsMessage() {
        return $(`p#result-message`);
    }

    get adjustDefaultValuesLink() {
        return $(`=Adjust default values`);
    }

    //Default calculator values Page
    get defaultCalculatorValuesHeader() {
        return $(`h1#default-values-modal-title`);
    }

    get additionalIncome() {
        return $(`input#additional-income`);
    }

    get retirementDuration() {
        return $(`input#retirement-duration`);
    }

    get yesRadioButton() {
        return $(`label=Yes`);
    }

    get expectedInflationRate() {
        return $(`#expected-inflation-rate`);
    }
    get retirementAnnualIncome() {
        return $(`input#retirement-annual-income`);
    }

    //Investment expectations
    get preRetirementReturn() {
        return $(`input#pre-retirement-roi`);
    }
    get postRetirementReturn() {
        return $(`input#post-retirement-roi`);
    }

    get saveChangesButton() {
        return $(`button=Save changes`);
    }

    async Calculate() {
        await this.calculateButton.click();
    }

    async saveChanges() {
        await this.saveChangesButton.click();
    }
}

export default new RetirementCalculatorPage();
