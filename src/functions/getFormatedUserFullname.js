export const getFormatedUserFullName = (firstName, lastName) => {
    const fullName = firstName + ' ' + lastName;
    return fullName.length > 25
    ? fullName.slice(0, 25) + ".."
    : fullName.trim();
}