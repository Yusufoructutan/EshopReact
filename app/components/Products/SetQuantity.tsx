// app/components/Products/SetQuantity.tsx
"use client";


const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQuantity: React.FC<SetQtyProps> = ({
    quantity,
    handleQtyIncrease,
    handleQtyDecrease,
}) => {
    return (
        <div className="flex gap-8 items-center">
            <div className="flex gap-4 items-center text-base">
                <button onClick={handleQtyDecrease} className={btnStyles}>-</button>
                <div>{quantity}</div>
                <button onClick={handleQtyIncrease} className={btnStyles}>+</button>
            </div>
        </div>
    );
}

export default SetQuantity;
