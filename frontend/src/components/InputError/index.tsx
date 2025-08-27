interface IProps {
    helperText?: string;
    isError?: boolean;
}
export function InputError({ helperText }: IProps) {
    if (helperText) return <small className="text-red-500">{helperText}</small>;
    return null;
}
