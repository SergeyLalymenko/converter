import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchConvertorCurrenciesLive } from '../../store/currenciesLiveSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './Convertor.scss';

function Convertor() {
    const dispatch = useAppDispatch();
    const currenciesLive = useAppSelector((state) => state.currenciesLive.converterData);
    const currenciesList = useAppSelector((state) => state.currenciesList.data);
    const [inCurrency, setInCurrency] = useState('USD');
    const [inputValue, setInputValue] = useState('');

    function onCurrenciesChange(): void {
        const valuesArr: string[] = inputValue.trim().split(' ');

        if(isValidInputValue(valuesArr)) {
            dispatch(fetchConvertorCurrenciesLive({
                base: valuesArr[1].toUpperCase(),
                converted: inCurrency,
                amount: +valuesArr[0],
            }));
        }
    }

    function isValidInputValue(valuesArr: string[]): boolean {
        if(valuesArr.length === 2 && !isNaN(+valuesArr[0]) && isValidCurrencyName(valuesArr[1])) {
            return true;
        }

        return false;
    }

    function isValidCurrencyName(currency: string): boolean {
        const selectedCurrency = currenciesList?.find((currencyName: string) => currencyName === currency.toUpperCase());

        return !!selectedCurrency;
    }

    return (
        <div className="convertor">
            <Link to="/dashboard" className="convertor__navigate">
                Dashboard
            </Link>

            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onBlur={onCurrenciesChange} placeholder="15 USD" />

            <p className="convertor__separator">in</p>

            <select value={inCurrency} onChange={(e) => setInCurrency(e.target.value)} onBlur={onCurrenciesChange}>
                {
                    !currenciesList ? (
                        <option value={inCurrency}>
                            {inCurrency}
                        </option>
                    ) : (
                        currenciesList.map((currencyName: string) => (
                            <option value={currencyName} key={currencyName}>
                                {currencyName}
                            </option>
                        ))
                    )
                }
            </select>

            {
                currenciesLive && (
                    <div className="convertor__currency">
                        <p>
                            {`${currenciesLive.base} = ${currenciesLive.value} ${currenciesLive.converted}`}
                        </p>
                    </div>
                )
            }
        </div>
    );
}

export default Convertor;