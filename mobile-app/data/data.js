// data.js
export const FAQdata = [
  {
    Topic: 'Getting Started',
    QuestionsAndText: [
      {
        Question: 'What information will I need before using the CGC Tracker?',
        Text: [
          'Your personal and/or entity details, as well as the details of anyone else that will be on the application.',
          'Your portfolio balances that you will input on the application.',
          'Optional: your financial goal.',
        ],
      },
      {
        Question: 'What different types of assets can I import into the CGC Tracker?',
        Text: [
          'The following assets are supported by the application:',
          '- Cryptocurrency',
          '- Stocks and Dividends',
          '- Bonds and Certificate of Deposits',
          '- Stock Options',
          '- Cash',
        ],
      },
      {
        Question: 'Does the application support different types of investors?',
        Text: [
          'The following Investor Types can be selected in the application (note: the selection made will have impacts on how Tax is calculated by the application):',
          '- Individual',
          '- Joint (up to 3 individuals over the age of 18 on a joint account)',
          '- Kids (minors listed as an account beneficiary wherein the individual is the account creator)',
        ],
      },
      {
        Question: 'Can I open multiple trading accounts?',
        Text: [
          'Yes. On the application:',
          '- Select Settings',
          '- Select Portfolios',
          '- Click Open a New Portfolio',
          "Once you have multiple trading accounts, you will be able to select which account will be your 'default' trading account which the application will automatically open. To change the default trading account simply click go to Settings > Portfolios > Change Default Portfolio and select the relevant portfolio.",
        ],
      },
      {
        Question: 'Can I change my residency to another country other than Australia?',
        Text: [
          'The CGC Application is only able to support clients who are Australian residents for tax purposes. There are two main criteria to determine if you are an Australian resident for tax purposes:',
          '- You reside in Australia continuously for a minimum of 183 days (6 months) in one location and/or',
          '- You are studying and living in Australia continuously for a minimum of 183 days (6 months)',
          'Please note: The CGC Team cannot provide personal advice relating to your tax residency status. If you are still unsure of your tax residency status, you may want to consult a registered tax professional.',
        ],
      },
    ],
  },
  {
    Topic: 'Identity Verification',
    QuestionsAndText: [
      {
        Question: 'Do I need to verify my identity?',
        Text: [
          'As the CGC Application for all intents and purposes is for self-monitoring of portfolio balances and tax obligations, there is no identity verification required for use of the application. Please note however the user experience and accuracy of any automatically generated statements may suffer decreased performance due to inaccurate information provided.',
        ],
      },
      {
        Question: 'Do I need to verify my portfolio holdings?',
        Text: [
          'As the CGC Application for all intents and purposes is for self-monitoring of portfolio balances and tax obligations, there is no verification of portfolio holdings required for use of the application. Please note however the user experience and accuracy of any automatically generated statements may suffer decreased performance due to inaccurate information provided.',
        ],
      },
      {
        Question: 'Can I add two-factor authentication to my CGC Application account?',
        Text: [
          'Two-factor authentication (2FA) is an extra layer of security for your CGC Application account designed to prevent unauthorized access by requiring authentication from an additional device (your phone).',
          'It requires a code from an authenticator app, on top of your standard login details, for you to be able to access your account. Examples of authenticator apps include Google Authenticator, Duo Mobile, and Microsoft Authenticator, along with many others.',
        ],
      },
      {
        Question: 'How do you activate 2FA?',
        Text: [
          'You can activate 2FA from the CGC Application. Note that 2FA cannot be activated from the mobile app, but once this is done via the website, the mobile app will prompt for 2FA.',
          '1. Log into the CGC Application.',
          '2. Select Settings',
          '3. Once on the settings page, navigate to Personal Details',
          '4. Under your password, you will find a button called Enable 2FA',
          '5. Follow the prompts, noting down your recovery codes in a safe place. You will need to have your authenticator app ready to scan a QR code that will be displayed on the screen',
          '6. Once activated, you will be required to use the 2FA code to access your account along with your standard login details. You will also need to re-enter your login details into your CGC Application after activating 2FA.',
        ],
      },
      {
        Question: 'What if I lose access to my authenticator device?',
        Text: [
          'During the setup process, you will be provided with a set of recovery codes. These can be stored in a safe place (either written or digitally) so that you can recover your account if you lose access to your authenticator device.',
          "If you don't have your codes, don't panic! Simply reach out via email with your account details ready, and we can assist in recovering your account.",
        ],
      },
    ],
  },
  {
    Topic: 'Starter FAQ’s',
    QuestionsAndText: [
      {
        Question: 'Can I trade through the application?',
        Text: [
          'As the CGC Application for all intents and purposes is for self-monitoring of portfolio balances and tax obligations, there is no trading functionality within the application. Conduct all trades through your broker(s)/trading app(s) and then lodge the transaction into the CGC Application to maintain a record of your trading history and tax obligations arising out of these trades.',
        ],
      },
      {
        Question: 'Can the CGC application give me Financial Advice on how to invest?',
        Text: [
          'The application cannot be used to facilitate the fulfillment of orders of any commodity but rather as a tool to track these orders and trades and provide a tax estimate based on the provided activity. Although the application cannot provide financial advice in consideration of your personal circumstances, for beginner investors please see the Beginners Trading FAQ for general advice.',
        ],
      },
      {
        Question: 'Can I input International trades?',
        Text: [
          'Yes, you can. Although CGT on the disposal of an international investment is subject to the same Tax laws as Australian Investments, the treatment of international dividends is subject to different treatment dependent upon the country of origin. Refer to the Beginners Trading FAQ for more information regarding inputting International Trades. Refer to the Beginners Tax FAQ for general advice on how tax works on different CGT events and items.',
        ],
      },
      {
        Question:
          'Can I attach the tax file produced by the CGC application in my ATO tax submission instead of my going through my accountant?',
        Text: [
          'The CGC Application for all intents and purposes is for self-monitoring of portfolio balances and tax obligations and is to be used as a tool to assist one with completing their tax return - not a tool that does your taxes for you. The accuracy of any automatically generated statements may suffer inaccuracy due to any incorrect information provided.',
          'Please note: The CGC Team cannot provide personal advice relating to your tax obligations to the ATO. If you are still unsure of your tax obligations, you may want to consult a registered tax professional.',
        ],
      },
    ],
  },
  {
    Topic: 'Beginners Trading FAQ',
    QuestionsAndText: [
      {
        Question: 'How do I buy or sell shares?',
        Text: [
          'You buy or sell shares through either the share registry which the company is located on or through any type of broker or application that allows the trade of shares. The CGC application does not act as a facilitator of trades but rather a documentation type service to track all commodity transactions across multiple platforms.',
        ],
      },
      {
        Question: 'How do I buy or sell cryptocurrency?',
        Text: [
          'You can buy or sell cryptocurrency through a variety of brokers, apps, or exchanges where the cryptocurrency is traded. The CGC application does not act as a facilitator of trades but rather a documentation type service to track all commodity transactions across multiple platforms.',
        ],
      },
      {
        Question: 'How can I check if my portfolio is doing well versus the market?',
        Text: [
          'The market average return is measured by the performance of the S&P500. To include the S&P500 alongside the graphical representation of your portfolio, see the following instructions:',
          '1. Select Settings',
          '2. Select Portfolios',
          '3. Select Compare Portfolio',
          'Once you have multiple trading accounts, you will be able to select which accounts to compare against each other as well as a few default standard industry benchmarks included.',
        ],
      },
      {
        Question:
          'I’m new to the share market. How can I look at the landscape and pick what shares to invest in?',
        Text: [
          'Please note: The CGC Team cannot provide personal advice relating to your financial situation. If you are still unsure of how to reach your financial goals, you may want to consult a financial professional.',
        ],
      },
      {
        Question:
          'I’m new to cryptocurrency. How do I look at the landscape and pick what cryptocurrency to invest in?',
        Text: [
          'Please note: The CGC Team cannot provide personal advice relating to your financial situation. If you are still unsure of how to reach your financial goals, you may want to consult a financial professional.',
        ],
      },
      {
        Question: 'How do I input international trades and dividends? Do I treat them differently?',
        Text: ['Hello'],
      },
    ],
  },
];
