const Input = ({ placeholder, type='text', onChange, ...rest }) => {
  return (
    <input
      className='bg-[#F1F4FF] rounded-[10px] border-2 border-[#1F41BB] p-5 text-[#626262] text-base font-medium h-[50px] lg:h-auto'
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      {...rest}
    />
  )
}

export default Input
