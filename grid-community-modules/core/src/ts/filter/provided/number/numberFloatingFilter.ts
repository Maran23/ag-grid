import { getAllowedCharPattern, NumberFilter, NumberFilterModel, NumberFilterModelFormatter, NumberFilterParams } from './numberFilter';
import { FloatingFilterInputService, FloatingFilterTextInputService, ITextInputFloatingFilterParams,TextInputFloatingFilter } from '../../floating/provided/textInputFloatingFilter';
import { SimpleFilterModelFormatter } from '../simpleFilter';
import { IFloatingFilterParams } from '../../floating/floatingFilter';
import { AgInputNumberField } from '../../../widgets/agInputNumberField';
import { AgInputTextField } from '../../../widgets/agInputTextField';
import { BeanStub } from '../../../context/beanStub';

class FloatingFilterNumberInputService extends BeanStub implements FloatingFilterInputService {
    private eFloatingFilterTextInput: AgInputTextField;
    private eFloatingFilterNumberInput: AgInputNumberField;
    private valueChangedListener: (e: KeyboardEvent) => void = () => {};

    private numberInputActive = true;

    public setupGui(parentElement: HTMLElement): void {
        this.eFloatingFilterNumberInput = this.createManagedBean(new AgInputNumberField());
        this.eFloatingFilterTextInput = this.createManagedBean(new AgInputTextField());

        this.eFloatingFilterTextInput.setDisabled(true);

        const eNumberInput = this.eFloatingFilterNumberInput.getGui()
        const eTextInput = this.eFloatingFilterTextInput.getGui()

        parentElement.appendChild(eNumberInput);
        parentElement.appendChild(eTextInput);

        this.setupListeners(eNumberInput, (e: KeyboardEvent) => this.valueChangedListener(e));
        this.setupListeners(eTextInput, (e: KeyboardEvent) => this.valueChangedListener(e));
    }

    public setEditable(editable: boolean): void {
        this.numberInputActive = editable;
        this.eFloatingFilterNumberInput.setDisplayed(this.numberInputActive);
        this.eFloatingFilterTextInput.setDisplayed(!this.numberInputActive);
    }

    public setAutoComplete(autoComplete: boolean | string): void {
        this.eFloatingFilterNumberInput.setAutoComplete(autoComplete);
        this.eFloatingFilterTextInput.setAutoComplete(autoComplete);
    }

    public getValue(): string | null | undefined {
        return this.getActiveInputElement().getValue();
    }

    public setValue(value: string | null | undefined, silent?: boolean): void {
        this.getActiveInputElement().setValue(value, silent);
    }

    private getActiveInputElement(): AgInputTextField | AgInputNumberField {
        return this.numberInputActive ? this.eFloatingFilterNumberInput : this.eFloatingFilterTextInput;
    }

    public setValueChangedListener(listener: (e: KeyboardEvent) => void): void {
        this.valueChangedListener = listener;
    }

    private setupListeners(element: HTMLElement, listener: (e: KeyboardEvent) => void): void {
        this.addManagedListener(element, 'input', listener);
        this.addManagedListener(element, 'keydown', listener);
    }

    public setParams(params: { ariaLabel: string, autoComplete?: boolean | string }): void {
        this.setAriaLabel(params.ariaLabel);
        
        if (params.autoComplete !== undefined) {
            this.setAutoComplete(params.autoComplete);
        }
    }

    private setAriaLabel(ariaLabel: string): void {
        this.eFloatingFilterNumberInput.setInputAriaLabel(ariaLabel);
        this.eFloatingFilterTextInput.setInputAriaLabel(ariaLabel);
    }
}

export interface INumberFloatingFilterParams extends ITextInputFloatingFilterParams {
}

export class NumberFloatingFilter extends TextInputFloatingFilter<NumberFilterModel> {
    private filterModelFormatter: SimpleFilterModelFormatter;
    private allowedCharPattern: string | null;

    public init(params: INumberFloatingFilterParams): void {
        super.init(params);
        this.filterModelFormatter = new NumberFilterModelFormatter(
            this.localeService,
            this.optionsFactory,
            (params.filterParams as NumberFilterParams)?.numberFormatter
        );
    }

    public onParamsUpdated(params: INumberFloatingFilterParams): void {
        const allowedCharPattern = getAllowedCharPattern(params.filterParams);
        if (allowedCharPattern !== this.allowedCharPattern) {
            this.recreateFloatingFilterInputService(params);
        }
        super.onParamsUpdated(params);
        this.filterModelFormatter.updateParams({ optionsFactory: this.optionsFactory });
    }

    protected getDefaultFilterOptions(): string[] {
        return NumberFilter.DEFAULT_FILTER_OPTIONS;
    }

    protected getFilterModelFormatter(): SimpleFilterModelFormatter {
        return this.filterModelFormatter;
    }

    protected createFloatingFilterInputService(params: INumberFloatingFilterParams): FloatingFilterInputService {
        this.allowedCharPattern = getAllowedCharPattern(params.filterParams);
        if (this.allowedCharPattern) {
            // need to use text input
            return this.createManagedBean(new FloatingFilterTextInputService({
                config: { allowedCharPattern: this.allowedCharPattern },
            }));
        }
        return this.createManagedBean(new FloatingFilterNumberInputService());
    }
}
