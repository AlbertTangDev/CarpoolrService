$.ajax({
    type:'GET',
    url: '/api/user/trips',
    success: (data, textStatus, req) => {
        const trips = JSON.parse(data);

        if (trips['trips'].length == 0) {
            $("#no-trip-message").show();
            return;
        }

        trips['trips'].forEach(trip => {
            const tripLink = document.createElement("a");
            tripLink.href = `/trip?guid=${trip['guid']}`;
            tripLink.innerHTML = trip['displayName'];
            tripLink.style = "display:block;";
            $("#trip-list").append(tripLink);
        });
    },
});