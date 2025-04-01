function formatPhoneNumber(phone: string | number): string {
    const phoneStr = String(phone);

    const cleanedPhone = phoneStr.replace(/\D/g, '');

    const formattedPhone = `+998 ${cleanedPhone.slice(3, 5)} ${cleanedPhone.slice(5, 8)} ${cleanedPhone.slice(8, 10)} ${cleanedPhone.slice(10, 12)}`;

    return formattedPhone;
}

export default formatPhoneNumber
