export default function Button({isRemove, ...props}) {
    const buttonClassName = isRemove ? 'bg-[red]': ''

    return <button className={`${buttonClassName} bg-[blue] rounded-[15px] leading-[1rem] m-[5px] border-[1px] border-solid border-transparent hover:border-black p-[5px] text-white`} {...props}></button>
}
