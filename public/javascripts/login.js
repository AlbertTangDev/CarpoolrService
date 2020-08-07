$("#login-form").submit((e) => {
    
    e.preventDefault();
    
    const formData = $('#login-form').serialize();

    $.ajax({
        type:'POST',
        url: '/login',
        data: formData,
        success: (data, textStatus, req) => {
            const guid = req.getResponseHeader('Carpoolr-Guid');
            const token = req.getResponseHeader('Carpoolr-Token');

            // should never happen
            if (document.cookie == "")
            {
                document.cookie = `carpoolr-guid=${guid}`;
                document.cookie = `carpoolr-token=${token}`;
            }
            window.location.href = '/dashboard';
        },
    });
});