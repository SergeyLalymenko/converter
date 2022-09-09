import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboardCurrenciesLive } from '../../store/currenciesLiveSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './Dashboard.scss';

function Dashboard() {
    const dispatch = useAppDispatch();
    const currenciesLive = useAppSelector((state) => state.currenciesLive.dashboardData);
    const currenciesList = useAppSelector((state) => state.currenciesList.data);
    const [baseCurrency, setBaseCurrency] = useState('USD');

    useEffect(() => {
        dispatch(fetchDashboardCurrenciesLive(baseCurrency));
    }, [dispatch, baseCurrency]);

    return (
        <div className="dashboard">
            <Link to="/convertor" className="dashboard__navigate">
                Convertor
            </Link>

            <select value={baseCurrency} onChange={(e: any) => setBaseCurrency(e.target.value)}>
                {
                    !currenciesList ? (
                        <option value={baseCurrency}>
                            {baseCurrency}
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

            <div className="dashboard__currencies">
                {
                    currenciesLive && currenciesLive.map((currency) => (
                        <div className="dashboard__currency" key={currency.key}>
                            <p>
                                {`1 ${currency.base} = ${currency.value} ${currency.converted}`}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Dashboard;