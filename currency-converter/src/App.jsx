import { useState } from 'react'
import './App.css'
import useCurrencyInfo from "./hooks/useCurrencyInfo.js";
import { InputBox } from "./components/index.js";

function App() {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("bdt")
    const [convertedAmount, setConvertedAmount] = useState(0)

    const currencyInfo = useCurrencyInfo(from)
    const options = Object.keys(currencyInfo || {})

    const swap = () => {
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }

    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        }
    }

    return (
        <>
            <div
                className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
                style={{
                   // backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                    backgroundImage: `url('https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1920&q=80')`,
                }}
            >
                <div className="w-full">
                    <div className="w-full max-w-md mx-auto border border-white/20 rounded-2xl p-6 backdrop-blur-md bg-white/30 shadow-2xl">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                convert();
                            }}
                        >
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => setFrom(currency)}
                                    selectCurrency={from}
                                    onAmountChange={(amount) => setAmount(amount)}
                                />
                            </div>

                            {/* Curved Swap Button with Dynamic Green Gradient */}
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 border-2 border-white rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 hover:from-emerald-600 hover:to-teal-800 active:scale-95 text-white text-xs font-semibold px-4 py-1.5 shadow-lg shadow-emerald-950/20 transition-all duration-200 cursor-pointer"
                                    onClick={swap}
                                >
                                    {/* Up Arrow */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4" />
                                    </svg>

                                    <span className="tracking-wide uppercase">Swap</span>

                                    {/* Down Arrow */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </div>

                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => setTo(currency)}
                                    selectCurrency={to}
                                    amountDisable
                                />
                            </div>

                            {/* Directional Flow Gradient Button (Emerald -> Teal) */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-800 active:scale-[0.99] text-white font-medium px-4 py-3 rounded-xl shadow-lg shadow-emerald-900/30 transition-all duration-200 cursor-pointer"
                            >
                                Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;