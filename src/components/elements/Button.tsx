export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const {className, children, ...rest} = props;
    return(
        <button type="submit" className={`rounded-xl hover:bg-slate-100 text-gray-700 ${className}`} {...rest}>{children}</button>
    )
}