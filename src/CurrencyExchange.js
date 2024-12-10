import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import homeicon from './home.png';

function CurrencyExchange() {
  const navigate = useNavigate();

  const [sellingCurrency, setSellingCurrency] = useState('USD $');
  const [buyingCurrency, setBuyingCurrency] = useState('EUR €');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(null);
  const [transactionStep, setTransactionStep] = useState(0); 
  const [language, setLanguage] = useState('en'); 

  const currencies = ['USD $', 'EUR €', 'AMD ֏', 'RUB ₽'];


  const translations = {
    en: {
      title: 'Currency Exchange',
      sellCurrency: 'Sell Currency',
      buyCurrency: 'Buy Currency',
      exchangeRate: 'Exchange Rate',
      enterAmount: 'Enter Amount',
      maxLimit: 'Max limit for',
      amountExceeds: 'Amount exceeds the limit!',
      total: 'Total',
      confirm: 'Confirm',
      importMoney: 'Please import the money',
      takeMoney: 'Please take your money',
      needReceipt: 'Do you need a receipt?',
      thanks: 'Thanks for trusting us!',
      next: 'Next',
      home: 'Home',
      yes: 'Yes',
      no: 'No',
    },
    hy: {
      title: 'Արտարժույթի Փոխանակում',
      sellCurrency: 'Վաճառքի Արտարժույթ',
      buyCurrency: 'Գնման Արտարժույթ',
      exchangeRate: 'Փոխարժեք',
      enterAmount: 'Մուտքագրեք գումարը',
      maxLimit: 'Առավելագույն սահմանաչափը՝',
      amountExceeds: 'Գումարը գերազանցում է սահմանաչափը!',
      total: 'Ընդհանուր',
      confirm: 'Հաստատել',
      importMoney: 'Խնդրում ենք ներդնել գումարը',
      takeMoney: 'Խնդրում ենք վերցնել գումարը',
      needReceipt: 'Ցանկանու՞մ եք տպել անդորագիր',
      thanks: 'Շնորհակալություն վստահության համար!',
      next:'Հաջորդ էջ',
      home: 'Գլխավոր Էջ',
      yes: 'Այո',
      no: 'Ոչ',
    },
    ru: {
      title: 'Обмен Валюты',
      sellCurrency: 'Валюта продажи',
      buyCurrency: 'Валюта покупки',
      exchangeRate: 'Курс Валют',
      enterAmount: 'Введите Сумму',
      maxLimit: 'Максимальный лимит: ',
      amountExceeds: 'Сумма превышает лимит!',
      total: 'Итог',
      confirm: 'Подтвердить',
      importMoney: 'Пожалуйста, внесите деньги',
      takeMoney: 'Пожалуйста, заберите деньги',
      needReceipt: 'Хотите распечатать чек?',
      thanks: 'Спасибо за доверие!',
      next:'Следующий',
      home: 'Главная Страница',
      yes: 'Да',
      no: 'Нет',
    },
  };

  const moneyLimitations = {
    'USD $': 1000,
    'EUR €': 1000,
    'AMD ֏': 500000,
    'RUB ₽': 100000,
  };

  const fakeApiCall = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random().toFixed(2)); // Simulate a random exchange rate
      }, 500);
    });
  };

  useEffect(() => {
    if (sellingCurrency && buyingCurrency) {
      const fetchExchangeRate = async () => {
        const rate = await fakeApiCall();
        setExchangeRate(rate);
      };
      fetchExchangeRate();
    }
  }, [sellingCurrency, buyingCurrency]);

  useEffect(() => {
    if (amount && exchangeRate) {
      setTotal((amount * exchangeRate).toFixed(2));
    } else {
      setTotal(null);
    }
  }, [amount, exchangeRate]);

  useEffect(() => {
    if (transactionStep === 1) {
      const timeout = setTimeout(() => {
        setTransactionStep(2); 
      }, 10000); 
      return () => clearTimeout(timeout);
    }
  }, [transactionStep]);

  const handleConfirm = () => {
    setTransactionStep(1); 
  };

  const handleNext = () => {
    if (transactionStep === 2) {
      setTransactionStep(3); 
    } else if (transactionStep === 3) {
      setTransactionStep(4); 
    }
  };

  const handleReceiptChoice = (choice) => {
    setTransactionStep(4); 
  };

  const resetValues = () => {
    setSellingCurrency('USD $');
    setBuyingCurrency('EUR €');
    setAmount('');
    setTotal(null);
    setExchangeRate(null);
  };

  const t = translations[language]; 

  return (
    <div style={styles.container}>
      <div style={styles.languageSelector}>
        <button onClick={() => setLanguage('en')} style={styles.languageButton}>EN</button>
        <button onClick={() => setLanguage('hy')} style={styles.languageButton}>ՀՅ</button>
        <button onClick={() => setLanguage('ru')} style={styles.languageButton}>РУ</button>
      </div>

      {transactionStep === 0 && (
        <>
          <h2>{t.title}</h2>

          <div>
            <h3>{t.sellCurrency}</h3>
            {currencies.map((currency) => (
              <label key={currency}>
                <input
                  type="radio"
                  name="sellingCurrency"
                  value={currency}
                  checked={sellingCurrency === currency}
                  onChange={(e) => setSellingCurrency(e.target.value)}
                />
                {currency}
              </label>
            ))}
          </div>

          <div>
            <h3>{t.buyCurrency}</h3>
            {currencies.map((currency) => (
              <label key={currency}>
                <input
                  type="radio"
                  name="buyingCurrency"
                  value={currency}
                  checked={buyingCurrency === currency}
                  onChange={(e) => setBuyingCurrency(e.target.value)}
                />
                {currency}
              </label>
            ))}
          </div>

          {exchangeRate && <p>{t.exchangeRate}: {exchangeRate}</p>}

          <div>
            <label>{t.enterAmount}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              style={styles.inputField}
            />
          </div>

          {amount && (
            <div style={styles.limitations}>
              <p>
                {t.maxLimit} {sellingCurrency}: {moneyLimitations[sellingCurrency]}
              </p>
              {amount > moneyLimitations[sellingCurrency] && (
                <p>{t.amountExceeds}</p>
              )}
            </div>
          )}

          {total && <p>{t.total}: {total} {buyingCurrency}</p>}

          <button
            onClick={handleConfirm}
            disabled={!amount || amount > moneyLimitations[sellingCurrency]}
            style={styles.defaultButton}
          >

            {t.confirm}
          </button>
        </>
      )}

      {transactionStep === 1 && (
        <div style={styles.centerContent}>
          <h2>{t.importMoney}</h2>
        </div>
      )}

      {transactionStep === 2 && (
       <div style={styles.centerContent}>
        <h2>{t.takeMoney}</h2>
        <button 
            onClick={handleNext}
            style={styles.defaultButton}
          >
            {t.next}
          </button>
        </div>
      )}

      {transactionStep === 3 && (
        <div style={styles.centerContent}>
          <h2>{t.needReceipt}</h2>
          <button 
            onClick={() => handleReceiptChoice('Yes')}
            style={styles.defaultButton}
          >
            {t.yes}
          </button>
          <button 
            onClick={() => handleReceiptChoice('No')}
            style={styles.defaultButton}
          >
            {t.no}
          </button>
        </div>
      )}

      {transactionStep === 4 && (
        <div style={styles.centerContent}>
          <h2>{t.thanks}</h2>
          <button
            style={styles.homeButton}
            onClick={() => {
              setTransactionStep(0);
              resetValues();
            }}
          >
            <img src={homeicon} alt="Home" style={styles.homeicon} />
            {t.home}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    width: '600px',
    height: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
  centerContent: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column',
    height: '100%', 
    textAlign: 'center',
    margin:'auto',
  },
  limitations: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '0px',
  },
  languageSelector: {
    marginBottom: '20px',
    marginLeft: '10px',
    textAlign:'right',
  },
  homeButton: {
    padding: '10px',
    borderRadius: '8px',  
    backgroundColor: '#007bff',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
  },
  inputField: {
    padding: '8px 12px',                
    borderRadius: '8px',                
    border: '1px solid #ccc',          
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    outline: 'none',                   
    fontSize: '16px',                   
    width: '100%',                      
    boxSizing: 'border-box',  
    marginTop:'10px',          
  },
  homeicon: {
    width: '15px', 
    height: '15px', 
    marginRight: '2px', 
    color:'white',
  },
  defaultButton: {
    backgroundColor: 'white', 
    color: 'black', 
    fontSize: '14px', 
    padding: '10px 20px', 
    border: '1px solid lightgray', 
    borderRadius: '17px', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    cursor: 'pointer',
    marginTop:'7px',
  },
  
};

export default CurrencyExchange;
