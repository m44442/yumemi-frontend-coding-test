import { useState } from 'react';

type CheckboxProps = {
    label: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export const Checkbox = ({
    label,
    checked = false,
    onChange,
    className = '',
}: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setIsChecked(newChecked);
        onChange(newChecked);
    };

    return (
        <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm">{label}</span>
        </label>   
    )
}