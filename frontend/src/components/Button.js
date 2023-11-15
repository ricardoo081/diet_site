const Button = (props) => {
  return <button className='bg-[#006B99] opacity-75 text-white text-xl px-5 py-4 rounded-[10px] font-semibold shadow-[0_10px_20px_0px_rgba(203,214,255,0)]' type={props.type}>{props.label}</button>
}

export default Button
