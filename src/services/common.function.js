const formatterNumber = (val) => {
    if (!val) return "0";
    return Number(val).toLocaleString("en-US");
};

const getCoordsFromAddress = async (address) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
        , {
            headers: {
                "User-Agent": "mama-clean"  // đặt tên app của bạn
            }
        });
    const data = await res.json();
    if (data.length > 0) {
        console.log("Lat:", data[0].lat, "Lng:", data[0].lon);
        return { lat: data[0].lat, lon: data[0].lon };
    } else {
        console.error("Không tìm thấy tọa độ cho địa chỉ:", address);
        return null;
    }
};

export { formatterNumber, getCoordsFromAddress };

