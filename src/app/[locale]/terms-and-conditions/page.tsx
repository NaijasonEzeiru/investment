import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 mb-20 bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Terms and Conditions
        </h1>
        <h3 className="text-lg font-semibold">
          1. Hotel Booking and NFT Optimization
        </h3>
        <p>
          1.1 The minimum deposit required for account reset is 100 USDT/USDC.
        </p>
        <p>
          1.2 After completing all optimizations, users must apply for a full
          withdrawal before requesting an account reset.
        </p>
        <h3 className="text-lg font-semibold">2. Withdrawals</h3>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">2.1 Withdrawal limits:</h5>
          <li>
            <span className="font-medium">VIP1 users: </span> Maximum withdrawal
            of 5,000 USDT
          </li>
          <li>
            <span className="font-medium">VIP2 users: </span> Maximum withdrawal
            of 50,000 USDT
          </li>
          <li>
            <span className="font-medium">VIP4 users: </span> No upper
            withdrawal limit
          </li>
        </ul>
        <p>
          2.2 Users can apply for full withdrawal only after completing all
          orders.
        </p>
        <p>
          2.3 No withdrawals or refunds are permitted during the optimization
          process.
        </p>
        <p>
          2.4 Users must submit a withdrawal application through the platform
          before receiving funds.
        </p>
        <h3 className="text-lg font-semibold">3. Funds</h3>
        <p>
          3.1 All user funds are securely stored in their platform account, and
          full withdrawal is allowed after optimization is completed.
        </p>
        <p>
          3.2 To prevent capital loss, all transactions are processed
          automatically by the system rather than manually
        </p>
        <p>
          3.3 In case of unexpected fund loss, the platform assumes full
          responsibility.
        </p>
        <h3 className="text-lg font-semibold">4. Account Security</h3>
        <p>4.1 Each user is allowed only one workbench account.</p>
        <p>
          4.2 Users must not share passwords. The platform is not responsible
          for any loss caused by password disclosure.
        </p>
        <p>
          4.3 It is not recommended to use birthdays, ID numbers, or mobile
          numbers as passwords.
        </p>
        <p>
          4.4 If a user forgets their login or withdrawal password, they may
          contact online customer service for a reset.
        </p>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">
            4.5 User and Merchant Confidentiality Agreement:
          </h5>
          <li>
            All orders processed on this platform are real-time data from actual
            users.
          </li>
          <li>
            Users must maintain order confidentiality and ensure platform
            security.
          </li>
        </ul>
        <h3 className="text-lg font-semibold">5. Orders</h3>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">
            5.1 Rewards for completed optimizations:
          </h5>
          <li>
            <span className="font-medium">VIP1 users: </span> 0.5% per
            optimization
          </li>
          <li>
            <span className="font-medium">VIP2 users: </span> 0.6% per
            optimization
          </li>
          <li>
            <span className="font-medium">VIP3 users: </span> 0.8% per
            optimization
          </li>
          <li>
            <span className="font-medium">VIP4 users: </span> 1% per
            optimization
          </li>
        </ul>
        <p>
          5.2 After each optimization, funds and rewards are credited
          immediately to the user’s account.
        </p>
        <p>
          5.3 The system assigns tasks randomly based on the quality of user
          performance.
        </p>
        <p>5.4 Once assigned, orders cannot be canceled or skipped.</p>
        <p>
          5.5 To protect user interests, application amounts will increase based
          on account balances, leading to higher potential earnings.
        </p>
        <h3 className="text-lg font-semibold">6. Lucky Orders</h3>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">
            6.2 Rewards for completed lucky orders:
          </h5>
          <li>
            <span className="font-medium">VIP1 users: </span> 5% income per
            order
          </li>
          <li>
            <span className="font-medium">VIP2 users: </span> 6% income per
            order
          </li>
          <li>
            <span className="font-medium">VIP3 users: </span> 8% income per
            order
          </li>
          <li>
            <span className="font-medium">VIP4 users: </span> 10% income per
            order
          </li>
        </ul>
        <p>
          6.3 Funds from lucky orders are credited after the full optimization
          process, not immediately.
        </p>
        <p>
          6.4 The system assigns lucky orders based on recent recharge amounts
          in user accounts.
        </p>
        <p>6.5 Lucky orders cannot be canceled or skipped once assigned.</p>
        <h3 className="text-lg font-semibold">7. Deposits</h3>
        <p>
          7.1 Users select their own deposit amounts; the platform does not
          decide deposit amounts for them. It is recommended to start with an
          amount the user is comfortable with.
        </p>
        <p>
          7.2 If a deposit is needed due to lucky orders, users should follow
          the negative balance displayed in their account.
        </p>
        <p>
          7.3 Before making a deposit, users must confirm the correct wallet
          address with online customer service.
        </p>
        <p>
          7.4 The platform is not responsible for losses if a user deposits
          funds into the wrong wallet address.
        </p>
        <h3 className="text-lg font-semibold">8. Merchants</h3>
        <p>
          8.1 The platform updates orders every minute. Orders that remain
          unoptimized for a long period cannot be uploaded to the system.
        </p>
        <p>
          8.2 To protect merchant reputation, users must complete tasks within 8
          hours to prevent complaints and order freezing.
        </p>
        <p>8.3 The client provides a wallet address for user deposits.</p>
        <h3 className="text-lg font-semibold">9. Invitations</h3>
        <p>
          9.1 New users must register and sign in for 14 consecutive days or
          upgrade to VIP3 before using an invitation code to refer others
        </p>
        <p>
          9.2 If an account has not completed all optimizations, the user cannot
          invite others.
        </p>
        <p>
          9.3 After using an invitation code, users must sign in for 14
          consecutive days.
        </p>
        <p>9.4 Referrers receive a 20% referral commission.</p>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">10. Operation Hours</h5>
          <li>
            <span className="font-medium">Platform operation hours: </span> 5%
            10:00 – 21:59
          </li>
          <li>
            <span className="font-medium">Online customer service hours: </span>{" "}
            10:00 – 21:59
          </li>
          <li>
            <span className="font-medium">Withdrawal processing time: </span>{" "}
            10:00 – 21:59
          </li>
        </ul>
        <h3 className="text-lg font-semibold">11. Credit Value</h3>
        <p>
          11.1 The credit value ensures users complete orders within a specified
          time. Failure to do so results in credit deductions.
        </p>
        <p>11.2 A 100% credit value is required to process withdrawals.</p>
        <h2 className="text-center text-2xl font-semibold pt-7">Task Rules</h2>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">1. Deposit Method</h5>
          <li>
            The platform contains extensive information. Users are advised to
            contact customer service to confirm and verify their wallet address
            before making any deposits.
          </li>
          <li>
            After a successful deposit, users must provide a transaction slip to
            facilitate the update of their platform account by online customer
            service.
          </li>
          <li>
            The payee’s name and the transfer amount must match the provided
            wallet address for the payment to be processed immediately.
          </li>
          <li>
            If any issues arise during the deposit process, users should contact
            online customer service for assistance.
          </li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">2. Hotel Reservation and NFT Orders</h5>
          <li>
            The value of hotel reservation orders is adjusted based on market
            fluctuations.
          </li>
          <li>
            Orders are assigned randomly, depending on the total balance in the
            user’s account.
          </li>
          <li>
            A higher account balance results in higher-value reservation orders,
            leading to increased returns.
          </li>
          <li>
            Users who are concerned about handling high-value orders should
            avoid depositing excessive funds at the beginning.
          </li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">3. Withdrawal</h5>
          <li>
            Withdrawals are available daily between{" "}
            <span className="font-semibold">10:00 and 21:59</span>.
          </li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">4. Platform User Mode</h5>
          <li>
            Users can invite new members to join the platform and earn a{" "}
            <span className="font-semibold">120% referral commission.</span>.
          </li>
        </ul>
        <ul className="list-inside list-disc">
          <h5 className="font-medium">5. Operation Hours</h5>
          <li>
            Users can optimize hotel reservation orders during the platform’s
            operational hours, which run from{" "}
            <span className="font-semibold">10:00 to 21:59 daily</span>.
          </li>
        </ul>
        <h3 className="text-lg font-semibold">Note:</h3>
        <p>
          For further assistance, click “Contact Us” on the platform to connect
          with online customer service.
        </p>
      </main>
      <Footer />
    </>
  );
}
