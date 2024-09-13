import RetirementCalculatorPage from "../pageobjects/retirementCalculator.page";
import { config } from "../config/config.ts";

describe("Retirement savings calculator", () => {
    beforeEach(async () => {
        await browser.url(config.url);
    });

    it("submit form with required fields", async () => {
        await fillForm({
            currentAge: config.currentAgeValue,
            retirementAge: config.retirementAgeValue,
            currentAnnualIncome: config.currentAnnualIncome,
            currentTotalSavings: config.currentTotalSavings,
            currentAnnualSavings: config.currentAnnualSavingsPercent,
            savingsIncreaseRate: config.savingsIncreaseRatePercent,
        });
        await RetirementCalculatorPage.Calculate();
        await waitForResults();
    });
    it("submit form with all fields filled in", async () => {
        await fillForm({
            currentAge: config.currentAgeValue,
            retirementAge: config.retirementAgeValue,
            currentAnnualIncome: config.currentAnnualIncome,
            currentTotalSavings: config.currentTotalSavings,
            currentAnnualSavings: config.currentAnnualSavingsPercent,
            savingsIncreaseRate: config.savingsIncreaseRatePercent,
            spouseAnnualIncome: config.spouseAnnualIncome,
        });
        await RetirementCalculatorPage.Calculate();
        await waitForResults();
    });
    it("Additional Social Security fields should display/hide based on Social Security benefits toggle", async () => {
        await toggleRadioButton("socialSecurityBenefitsToggleYes", false);
        await toggleRadioButton("marriedRadioButton", false);
    });
    it("User should be able to update default calculator values", async () => {
        // await RetirementCalculatorPage.open();
        await RetirementCalculatorPage.adjustDefaultValuesLink.click();
        const defaultCalculatorValuesHeader =
            await RetirementCalculatorPage.defaultCalculatorValuesHeader;
        expect(await defaultCalculatorValuesHeader.getText()).toBe(
            "Default calculator values"
        );

        await updateDefaultCalculatorValue(
            "additionalIncome",
            config.additionalIncomeFieldValue
        );
        await updateDefaultCalculatorValue(
            "retirementDuration",
            config.retirementDurationValue
        );
        await updateDefaultCalculatorValue(
            "retirementAnnualIncome",
            config.retirementAnnualIncomeValue
        );
        await updateDefaultCalculatorValue(
            "preRetirementReturn",
            config.preRetirementReturnValue
        );
        await updateDefaultCalculatorValue(
            "postRetirementReturn",
            config.preRetirementReturnValue
        );
        await RetirementCalculatorPage.saveChanges();
    });
    async function fillForm(fields: { [key: string]: string | number }) {
        for (const [field, value] of Object.entries(fields)) {
            const element = await RetirementCalculatorPage[field];
            await element.click();
            await element.setValue("");
            await element.setValue(value);
            const enteredValue = await element.getValue();
            expect(enteredValue).toBe(value);
        }
    }

    async function waitForResults() {
        await browser.waitUntil(
            async () => {
                const resultsText =
                    await RetirementCalculatorPage.congratulationsMessage;
                return resultsText.isDisplayed();
            },
            {
                timeout: 10000,
                timeoutMsg: "Results not getting generated on time",
                interval: 500,
            }
        );
    }
    async function toggleRadioButton(
        radioButton: string,
        expectedSelection: boolean
    ) {
        const radioBtn = await RetirementCalculatorPage[radioButton];
        if (radioBtn) {
            await radioBtn.click();
            const isSelected = await radioBtn.isSelected();
            expect(isSelected).toBe(expectedSelection);
        } else {
            throw new Error(`Radio button '${radioButton}' not found`);
        }
    }
    async function updateDefaultCalculatorValue(
        field: string,
        value: string | number
    ) {
        const element = await RetirementCalculatorPage[field];
        if (field === "additionalIncome") {
            await element.click();
            await element.setValue("");
        }
        await element.setValue(value);
        expect(await element.getValue()).toBe(value);
    }
});
