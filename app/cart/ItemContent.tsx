import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

interface CartProductType {
    cartItemId: number; // Sepet ürünü kimliği
    productId: number;
    name: string;
    price: number;
    productImage: string;
    quantity: number;
}

interface ItemContentProps {
    item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const { handleRemoveProductFromCart } = useCart();

    const handleRemove = async () => {
        try {
            await handleRemoveProductFromCart(item.cartItemId);
            // Başarılı silme işlemi kullanıcıya bildirin
        } catch (error) {
            // Silme işlemi başarısız olduğunda kullanıcıya bilgi verin
            console.error('Failed to remove item from cart', error);
        }
    };

    return (
        <div className="grid grid-cols-5 gap-4 border-t border-slate-200 py-4 items-center">
            <div className="col-span-2 flex items-center gap-4">
                <Link href={`/product/${item.productId}`} className="relative w-[70px] h-[70px]">
                    <Image src={item.productImage} alt={item.name} fill className="object-cover" />
                </Link>
                <div className="flex flex-col justify-center">
                    <Link href={`/product/${item.productId}`} className="font-medium text-blue-500 hover:underline">
                        {item.name}
                    </Link>
                    <button
                        className="text-red-500 mt-1 hover:underline"
                        onClick={handleRemove}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="text-center">{item.price.toFixed(2)}</div>
            <div className="text-center">{item.quantity}</div>
            <div className="text-end font-semibold">{(item.price * item.quantity).toFixed(2)}</div>
        </div>
    );
};

export default ItemContent;
