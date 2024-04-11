import "../account/account.scss";

const Account = ({ accountData }) => {
    return (
        <div>
            {accountData.map((account, index) => (
                <section className="account" key={index}>
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{account.type} ({account.number})</h3>
                        <p className="account-amount">{account.balance}</p>
                        <p className="account-amount-description">{account.balanceDescription}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                          <button className="transaction-button" onClick={() => console.log("View transactions for Argent Bank Checking")}>View transactions</button>
                        </div>
                </section>
            ))}
        </div>
    );
};

export default Account;
