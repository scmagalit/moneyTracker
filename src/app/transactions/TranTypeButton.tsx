import { BiMinus, BiPlus, BiTransfer } from 'react-icons/bi';

type TranTypeButtonProps = {
    type: string;
};

export default function TranTypeButton({ type }: TranTypeButtonProps) {
    switch (type) {
        case 'INCOME':
            return (
                <div className="bg-green-600 rounded-md">
                    <BiPlus size={28} color="white" />
                </div>
            );
        case 'EXPENSE':
            return (
                <div className="bg-red-600 rounded-md">
                    <BiMinus size={28} color="white" />
                </div>
            );
        default:
            return (
                <div className="bg-blue-500 rounded-md">
                    <BiTransfer size={28} color="white" />
                </div>
            );
    }
}
