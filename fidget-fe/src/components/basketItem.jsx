import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const BasketItem = ({eachItem, handleRemoveBasket, handleAddBasket}) => {
    return (
        <div className="basketItem">
            <h2>{eachItem.title}</h2>
            <div className="quantityAndPrice">
                <div className="basketQuantity">
                    <button
                        aria-label={`Remove one ${eachItem.title} from basket`}
                        onClick={handleRemoveBasket}
                        value={JSON.stringify(eachItem)}
                    >
                        <IndeterminateCheckBoxIcon
                            className=""
                            sx={{
                                width: 30,
                                height: 30,
                                fill: "rgba(250, 235, 215, 0.95)",
                            }}
                        />
                    </button>
                    <h2 aria-label={`Quantity of ${eachItem.title} in basket`}>
                        {eachItem.amountOrdered}
                    </h2>
                    <button
                        aria-label={`Add another ${eachItem.title} to basket`}
                        onClick={handleAddBasket}
                        value={JSON.stringify(eachItem)}
                    >
                        <AddBoxIcon
                            sx={{
                                width: 30,
                                height: 30,
                                fill: "rgba(250, 235, 215, 0.95)",
                            }}
                        />
                    </button>
                </div>
                <h2 className="itemCost">£{eachItem.amountOrdered * eachItem.price}</h2>
            </div>
        </div>
    );
};

export default BasketItem;
