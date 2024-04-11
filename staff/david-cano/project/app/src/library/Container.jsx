export default function Container(props) {
    return <div className={`flex flex-col ${props.align === 'center' ? ' items-center' : ''} pt-3 pb-16`} {...props}></div>
}