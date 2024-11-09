import { useState } from 'react';

type CheckboxProps = {
    label: string; // チェックボックスのラベル
    checked?: boolean; // チェックボックスの初期状態
    onChange: (checked: boolean) => void; // チェックボックスの状態が変わったときに呼び出される関数
    className?: string; // カスタムクラス名
}

export const Checkbox = ({
    label,
    checked = false,
    onChange,
    className = '',
}: CheckboxProps) => {
    // チェックボックスの状態を管理するためのフック
    const [isChecked, setIsChecked] = useState(checked);

    // チェックボックスの状態が変わったときに呼び出される関数
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setIsChecked(newChecked); // 状態を更新
        onChange(newChecked); // 親コンポーネントに通知
    };

    return (
        <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
            <input
                type="checkbox"
                checked={isChecked} // チェックボックスの状態を設定
                onChange={handleChange} // 状態が変わったときに呼び出される関数を設定
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm">{label}</span> {/* チェックボックスのラベルを表示 */}
        </label>   
    )
}