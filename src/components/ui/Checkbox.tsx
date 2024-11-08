type  CheckboxProps = {
    label: string;
    onChange: (checked: boolean) => void
    className?: string;
}

export const Checkbox = ({
    label,
    onChange,
    className = '',
}: CheckboxProps) => {
    return (
        <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
            <input
                type="checkbox"
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm">{label}</span>
        </label>   
    )
}