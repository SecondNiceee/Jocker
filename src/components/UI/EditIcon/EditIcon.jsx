
const EditIcon = ({onClick = () => {}, styles = {}}) => {
    return (
        <div style={styles} onClick={onClick} className='bg-[#223d52] cursor-pointer rounded-full items-center flex justify-center w-[30px] h-[30px]'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0368 3.77803L15.0199 2.80394C15.5069 2.3169 15.525 1.78476 15.083 1.33379L14.7313 0.973017C14.2893 0.53107 13.7391 0.576167 13.2611 1.05419L12.278 2.01926L14.0368 3.77803ZM2.98809 14.8087L13.1709 4.62585L11.4212 2.88512L1.23834 13.0499L0.354445 15.1785C0.255232 15.449 0.534832 15.7467 0.805412 15.6475L2.98809 14.8087Z" fill="#2EA5FF" />
            </svg>
        </div>
    );
};

export default EditIcon;