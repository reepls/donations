import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import momo from '../assets/mtn_momo.png'
import orange from '../assets/mtn_momo.png'

export default function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'one-time' | 'monthly'>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<string>('2000')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<'XAF' | 'USD'>('XAF')
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  
  // Convert amounts based on currency selection
  const convertAmount = (amount: string, currency: 'XAF' | 'USD') => {
    const numAmount = parseFloat(amount)
    if (currency === 'USD') {
      return Math.round(numAmount / 620)
    }
    return numAmount
  }

  const formatAmount = (amount: number, currency: 'XAF' | 'USD') => {
    return currency === 'USD' ? amount.toLocaleString() : amount.toLocaleString()
  }

  const predefinedAmounts = ['2000', '5000', '10000', '20000', '50000']

  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-800 py-4 md:py-8 px-4">
      <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-neutral-200 mb-3">
            Help Us Keep Stories Flowing
          </h1>
          <p className="text-neutral-200 text-sm md:text-base leading-relaxed">
            Every post on Reepls is someone sharing their voice, perspective, and creativity with the world. 
            Your donation helps us maintain a platform where writers can publish freely and readers can discover authentic content. 
            For the cost of a coffee, you can support a space where stories connect people and ideas thrive.
          </p>
        </div>

        {/* Donation Type Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4 md:space-x-8">
            <button
              onClick={() => setActiveTab('one-time')}
              className={`pb-2 text-sm md:text-base font-medium ${
                activeTab === 'one-time'
                  ? 'text-neutral-50 border-b-2 md:border-b-4 border-primary-400'
                  : 'text-neutral-300'
              }`}
            >
              One-Time Donation
            </button>
            <button
              onClick={() => navigate('/monthly')}
              className="pb-2 text-sm md:text-base font-medium text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              Monthly Donation
            </button>
          </div>
        </div>


        {/* Donation Amount Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base md:text-lg font-medium text-neutral-100">
              How much would you like to donate?
            </h2>
            {/* Currency Dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setIsDropdownOpen(!isDropdownOpen)
                }}
                className="bg-primary-400 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center space-x-1 md:space-x-2 text-xs md:text-sm hover:bg-primary-400/80 transition-colors"
              >
                <span>{selectedCurrency}</span>
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0001.414 0L10 10.586l3.293-3.293a1 1 0001.414 1.414l-4 4a1 1 000-1.414 0l-4-4a1 1 00001.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-neutral-700 border border-neutral-500 rounded-lg shadow-lg z-10 py-1 min-w-[80px]">
                  <button
                    onClick={() => {
                      setSelectedCurrency('XAF')
                      setIsDropdownOpen(false)
                      setSelectedAmount('')
                      setCustomAmount('')
                    }}
                    className={`w-full text-left px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-600 transition-colors ${
                      selectedCurrency === 'XAF' ? 'bg-neutral-600 font-medium' : ''
                    }`}
                  >
                    XAF
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCurrency('USD')
                      setIsDropdownOpen(false)
                      setSelectedAmount('')
                      setCustomAmount('')
                    }}
                    className={`w-full text-left px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-600 transition-colors ${
                      selectedCurrency === 'USD' ? 'bg-neutral-600 font-medium' : ''
                    }`}
                  >
                    USD
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Predefined Amounts */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 md:gap-3 mb-3">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount('')
                }}
                className={`px-2 md:px-6 py-2 md:py-3 rounded-full border text-xs md:text-base font-medium ${
                  selectedAmount === amount && !customAmount
                    ? 'border-primary-400 bg-primary-50 text-primary-400'
                    : 'border-neutral-200 text-neutral-200 hover:border-primary-400'
                }`}
              >
                {formatAmount(convertAmount(amount, selectedCurrency), selectedCurrency)}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-2">
            <p className="text-neutral-100 mb-2 text-sm md:text-base">Or enter how much?</p>
            <div className="relative">
              <input
                type="text"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount('')
                }}
                placeholder="000000"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-neutral-400 rounded-lg text-sm md:text-base focus:outline-none focus:border-primary-500"
              />
              <span className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-xs md:text-sm">
                {selectedCurrency}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="mb-6">
          <h2 className="text-base md:text-lg font-medium text-primary-800 mb-3">
            Choose your payment method
          </h2>
          <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
            <img 
              src={momo} 
              alt="MTN MoMo" 
              className="h-16 md:h-20 w-auto rounded-lg border-2 border-neutral-400 hover:border-primary-400 transition-colors cursor-pointer" 
            />
            <img 
              src={orange} 
              alt="Orange Money" 
              className="h-16 md:h-20 w-auto rounded-lg border-2 border-neutral-400 hover:border-primary-400 transition-colors cursor-pointer" 
            />
          </div>
        </div>

        {/* Donate Button */}
        <button className="w-full bg-primary-400 text-white py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-primary-400/80 transition-colors">
          Donate Now
        </button>
      </div>
    </div>
  )
}
