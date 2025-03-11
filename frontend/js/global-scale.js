document.addEventListener("DOMContentLoaded", function () {
    var map = new jsVectorMap({
        selector: "#map",
        map: "world",
        selectedRegions: [
            "HK", // Hong Kong
            "CN", // China
            "VN", // Vietnam
            "PH", // Philippines
            "MY", // Malaysia
            "SG", // Singapore
            "ID", // Indonesia
            "BD", // Bangladesh
            "IN", // India
            "AE", // United Arab Emirates (Middle East)
            "NG", // Nigeria (West Africa)
            "RS", // Serbia
            "FI", // Finland
            "DE", // Germany
            "GB", // United Kingdom
            "US", // United States of America
            "BR"  // Brazil (South America)
        ], // Highlighted countries
        regionStyle: {
            selected: { fill: "#2ecc71" },
            initial: { fill: "#dcdcdc" },
            hover: { fill: "#ec971f" }
        }
    });
});