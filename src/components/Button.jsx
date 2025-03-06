export default function Button({
    type = "button",
    text,
    className,
    onClick
}) {
    return (
        <button
            className={`${className} outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer`}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
}