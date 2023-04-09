export function displayDateFormat(datetime: Date) {
    return Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(datetime);
}

export function displayTimeFormat(datetime: Date) {
    return Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(datetime);
}

export function formDateFormat(datetime: Date) {
    return [
        datetime.getFullYear(),
        (datetime.getMonth() + 1).toString().padStart(2, '0'),
        datetime.getDate().toString().padStart(2, '0')
    ].join('-');
}

export function formTimeFormat(datetime: Date) {
    return [
        datetime.getHours().toString().padStart(2, '0'),
        datetime.getMinutes().toString().padStart(2, '0')
    ].join(':');
}
