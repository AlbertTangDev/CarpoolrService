const logOut = () => {
    // should never happen
    if (!document.cookie)
        return;

    document.cookie = `carpoolr-guid=;expires=${new Date(0).toUTCString()}`
    document.cookie = `carpoolr-token=;expires=${new Date(0).toUTCString()}`

    window.location.href = '/login';
};