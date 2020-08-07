$.ajax({
    type:'GET',
    url: '/api/user/trips',
    success: (data, textStatus, req) => {
        const trips = JSON.parse(data);
        trips['trips'].forEach(trip => {
            $("#no-trip-message").hide();

            const tripLink = document.createElement("a");
            tripLink.href = `/trip?guid=${trip['guid']}`;
            tripLink.innerHTML = trip['displayName'];
            $("#trip-list").append(tripLink);
        });
    },
});