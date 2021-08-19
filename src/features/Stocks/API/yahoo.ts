const apiUrl = 'http://localhost:8000';

export function getShares(...symbols: string[]): Promise<QuoteResponse[]> {
	return fetch(`${apiUrl}/shares?symbols=${symbols.join(',')}`, {
		method: 'GET',
	})
		.then(async (res) => await res.json())
		.then((res) => res.quoteResponse.result)
		.catch((err) => console.debug(err));
}

export interface QuoteResponse {
	language: string;
	region: string;
	quoteType: string;
	quoteSourceName: string;
	triggerable: boolean;
	currency: string;
	marketState: string;
	shortName: string;
	firstTradeDateMilliseconds: number;
	fiftyTwoWeekLowChangePercent: number;
	priceHint: number;
	postMarketChangePercent: number;
	postMarketTime: number;
	postMarketPrice: number;
	postMarketChange: number;
	regularMarketChange: number;
	regularMarketChangePercent: number;
	regularMarketTime: number;
	regularMarketPrice: number;
	regularMarketDayHigh: number;
	regularMarketDayRange: string;
	regularMarketDayLow: number;
	regularMarketVolume: number;
	regularMarketPreviousClose: number;
	bid: number;
	ask: number;
	bidSize: number;
	askSize: number;
	fullExchangeName: string;
	financialCurrency: string;
	regularMarketOpen: number;
	averageDailyVolume3Month: number;
	averageDailyVolume10Day: number;
	fiftyTwoWeekLowChange: number;
	epsTrailingTwelveMonths: number;
	epsForward: number;
	epsCurrentYear: number;
	priceEpsCurrentYear: number;
	sharesOutstanding: number;
	bookValue: number;
	fiftyDayAverage: number;
	fiftyDayAverageChange: number;
	fiftyDayAverageChangePercent: number;
	twoHundredDayAverage: number;
	twoHundredDayAverageChange: number;
	twoHundredDayAverageChangePercent: number;
	marketCap: number;
	forwardPE: number;
	priceToBook: number;
	sourceInterval: number;
	exchangeDataDelayedBy: number;
	exchange: string;
	longName: string;
	messageBoardId: string;
	exchangeTimezoneName: string;
	exchangeTimezoneShortName: string;
	gmtOffSetMilliseconds: number;
	market: string;
	esgPopulated: boolean;
	fiftyTwoWeekRange: string;
	fiftyTwoWeekHighChange: number;
	fiftyTwoWeekHighChangePercent: number;
	fiftyTwoWeekLow: number;
	fiftyTwoWeekHigh: number;
	dividendDate: number;
	earningsTimestamp: number;
	earningsTimestampStart: number;
	earningsTimestampEnd: number;
	trailingAnnualDividendRate: number;
	trailingPE: number;
	trailingAnnualDividendYield: number;
	averageAnalystRating: string;
	tradeable: boolean;
	displayName: string;
	symbol: string;
}
